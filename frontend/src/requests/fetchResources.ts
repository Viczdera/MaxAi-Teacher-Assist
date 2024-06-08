import { BASE_URL } from "../constants/constants";
import axios from "axios";

export const fetchResources = async () => {
  const response = await axios
    .get(BASE_URL + "/resources")
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log("errror fetching resources", err);
    });
  return response;
};

