import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Avis = (props) => {
  console.log("props" + props);
  console.log(props);
  return (
    <View className="flex-col w-11/12 mx-auto justify-center">
      <View className="flex-row mt-4">
        <Text className="font-semibold  ml-2">Score :</Text>
        <View className="ml-2">
          <Ionicons name="star-outline" size={18} className="ml-2" />
        </View>
        <Text className="ml-2">{props.score} / 5</Text>
      </View>
      <View className="flex-row mt-4">
        <Text className="font-semibold  ml-2">Nombre d'avis :</Text>
        <Text className="ml-2">{props.count}</Text>
      </View>
      {props.count > 0 && (
        <View>
          {props.reviews.map((review) => {
            return (
              <View className="flex-col mt-4">
                <View className="flex-row">
                  <Text className="font-semibold  ml-2">Avis :</Text>
                  <Text className="ml-2">{review.review}</Text>
                </View>
                <View className="flex-row">
                  <Text className="font-semibold  ml-2">Note :</Text>
                  <View className="ml-2">
                    <Ionicons name="star-outline" size={18} className="ml-2" />
                  </View>
                  <Text className="ml-2">{review.score} / 5</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};
export default Avis;
