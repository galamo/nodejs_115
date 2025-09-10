import axios from "axios";
import { mainAxios } from "./main-axios";
import { UserDetailsResponse } from "@/pages/expenses";

export async function getUserDetailsApi(): Promise<UserDetailsResponse> {
  const result = await mainAxios.get(`/user/details`);
  return result.data as UserDetailsResponse;
}
