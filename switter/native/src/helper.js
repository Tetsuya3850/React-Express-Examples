import { AsyncStorage } from "react-native";

export const getToken = () => AsyncStorage.getItem("jwt-token");
export const saveToken = token => AsyncStorage.setItem("jwt-token", token);
export const removeToken = () => AsyncStorage.removeItem("jwt-token");

export const getOwnInfo = async () => {
  try {
    const token = await getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = Base64.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};

export const parseToken = token => {
  try {
    let payload;
    payload = token.split(".")[1];
    payload = Base64.atob(payload);
    return JSON.parse(payload);
  } catch (e) {
    console.log(e);
  }
};

export const latencyConverter = timestamp => {
  if (timestamp > 2592000000) {
    return "";
  } else if (timestamp > 86400000) {
    return ` ${Math.ceil(timestamp / 86400000)}d`;
  } else if (timestamp > 3600000) {
    return ` ${Math.ceil(timestamp / 3600000)}hr`;
  } else {
    return ` ${Math.ceil(timestamp / 60000)}min`;
  }
};

export const normalizeSweets = sweets => {
  const normalizedSweets = {};
  sweets.forEach(sweet => {
    normalizedSweets[sweet._id] = sweet;
  });
  return normalizedSweets;
};

export const selectSweetIds = sweets => {
  return sweets.map(sweet => sweet._id);
};

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const Base64 = {
  btoa: (input: string = "") => {
    let str = input;
    let output = "";

    for (
      let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || ((map = "="), i % 1);
      output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
    ) {
      charCode = str.charCodeAt((i += 3 / 4));

      if (charCode > 0xff) {
        throw new Error(
          "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
        );
      }

      block = (block << 8) | charCode;
    }

    return output;
  },

  atob: (input: string = "") => {
    let str = input.replace(/=+$/, "");
    let output = "";

    if (str.length % 4 == 1) {
      throw new Error(
        "'atob' failed: The string to be decoded is not correctly encoded."
      );
    }
    for (
      let bc = 0, bs = 0, buffer, i = 0;
      (buffer = str.charAt(i++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
};
