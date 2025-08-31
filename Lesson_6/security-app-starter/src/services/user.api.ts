import axios from "axios";
import { mainAxios } from "./main-axios";

export async function getUserDetailsApi(): Promise<any> {
  const result = await mainAxios.get(`/user/details`);
  return result.data as any;
}
