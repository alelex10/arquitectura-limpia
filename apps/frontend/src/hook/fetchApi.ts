import { URL_API_BASE } from "../constants/constants";

interface Props {
  endpoint: string;
  token?: string;
  type?: "GET" | "POST" | "PUT" | "DELETE";
  body: any;
}

export const fetchApi = async <T>({
  endpoint,
  token,
  type = "GET",
  body,
}: Props) => {
  try {
    console.log(`${URL_API_BASE}${endpoint}`);
    const response = await fetch(`${URL_API_BASE}${endpoint}`, {
      method: type,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseJson: T = await response.json();
    return responseJson;
  } catch (error: any) {
    console.log(error.message);
  }
};
