import { ReqResponseType } from "./typess";

const BASE_URL = "http://localhost:3000";

const SuccessResponse = (data?: any, message?: string): ReqResponseType => ({
  success: true,
  data,
  message:message||"",
});

const FailedResponse = (message?: string, data?: any): ReqResponseType => ({
  success: false,
  data,
  message:message||"",
});
export { SuccessResponse, FailedResponse, BASE_URL };
