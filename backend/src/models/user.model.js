const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    validate: {
      validator: function (el) {
        return el.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
      },
      message: "Please provide a valid email",
    },
  },
  telephone: {
    type: String,
    required: [true, "Please provide a telephone number"],
    validate: {
      validator: function (el) {
        return el.match(/^[0-9]{10}$/);
      },
      message: "Please provide a valid telephone number",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  profileImage: {
    type: String,
    default: "default.jpg",
  },
  reviewScore: {
    type: Number,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        required: [true, "Please provide a rating"],
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  cinScanned: {
    type: Boolean,
    default: false,
  },
  cinImage: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  this.reviewCount = this.reviews.length;
  this.reviewScore =
    this.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
    this.reviews.length;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hashSync(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compareSync(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

userSchema.methods.addReview = async function (review) {
    this.reviews.push(review);
    await this.save();
};


const User = mongoose.model("User", userSchema);

module.exports = User;
