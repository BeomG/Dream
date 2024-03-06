import { baseAxios } from "../Api";

export async function Signup(props) {
  try {
    const curStatus = props.myData ? "1" : "0";
    const res = await baseAxios.post(`user/signup/${curStatus}`, {
      name: props.name,
      email: props.email,
      password: props.password,
      residenceInfo: props.residenceInfo,
      regionKey: props.regionKey,
      endDate: props.endDate,
      isEnded: props.isEnded,
      myData: curStatus,
      createdDate: props.createdDate,
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function Login(props) {
  try {
    const res = await baseAxios.post("login", {
      email: props.email,
      password: props.password,
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function Exit() {
  const id = localStorage.getItem("id");
  try {
    const res = await baseAxios.patch(`exit/${id}`, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function EmailCheck(props) {
  try {
    const res = await baseAxios.get(`user/check/${props}`, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}
