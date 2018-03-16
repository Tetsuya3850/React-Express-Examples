import { Permissions, Notifications } from "expo";
import axios from "axios";
import { AsyncStorage } from "react-native";

const PUSH_ENDPOINT = "https://logsignserver.herokuapp.com/pushtoken/add";

export const registerForPushNotificationsAsync = async uid => {
  try {
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
  } catch (e) {
    console.log(e);
  }
};
