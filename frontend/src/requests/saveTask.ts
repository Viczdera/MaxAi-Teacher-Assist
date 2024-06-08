import {
  BASE_URL,
  FailedResponse,
  SuccessResponse,
} from "../constants/constants";
import axios from "axios";

export const saveTask = async (data: any) => {
  const response = await axios
    .post(BASE_URL + "/assignment", data)
    .then((response) => {
      if (response?.status === 201)
        return SuccessResponse(
          "Task saved successfully",
          response?.data?.message
        );
      return FailedResponse("Error saving task", response?.data);
    })
    .catch((err) => {
      return FailedResponse("Error saving task", err);
    });
  return response;
};
