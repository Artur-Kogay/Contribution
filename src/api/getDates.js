import axios from "axios";
import { API } from "./API";

export const getDates = async () => {
  try {
    const responce = await axios.get(API);
    return responce.data;
  } catch (error) {
    console.log(error.message);
  }
};
