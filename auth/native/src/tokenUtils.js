import { AsyncStorage } from "react-native";
import { decode } from "base-64";

const storageKey = "jwt-token";

export const getToken = () => AsyncStorage.getItem(storageKey);

export const saveToken = token => AsyncStorage.setItem(storageKey, token);

export const removeToken = () => AsyncStorage.removeItem(storageKey);

export const getTokenInfo = async () => {
  try {
    const token = await getToken();
    if (token) {
      const payload = decode(token.split(".")[1]);
      return JSON.parse(payload);
    }
  } catch (error) {
    console.error(error);
  }
};

export const isAuthed = async () => {
  const token_info = await getTokenInfo();
  if (token_info && token_info.exp > Math.round(new Date() / 1000)) {
    return token_info;
  } else {
    return false;
  }
};
