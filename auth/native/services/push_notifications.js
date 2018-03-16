import { Permissions, Notifications } from "expo";
import axios from "axios";
import { AsyncStorage } from "react-native";

const PUSH_ENDPOINT = "https://logsignserver.herokuapp.com/pushtoken/add";

export const registerForPushNotificationsAsync = async uid => {
  try {
    const previousToken = await AsyncStorage.getItem("pushtoken");
    if (previousToken) {
      return;
    }

    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();

    await axios.post(PUSH_ENDPOINT, { token, uid });
    await AsyncStorage.setItem("pushtoken", token);
  } catch (e) {
    console.log(e);
  }
};
