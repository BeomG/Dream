import { baseAxios } from "../Api";

export async function ChatBotAxios(props) {
  const data = decodeURI(decodeURIComponent(props));
  console.log(data);
  try {
    const res = await baseAxios.get(`welfare_info/search/${props}`, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}
