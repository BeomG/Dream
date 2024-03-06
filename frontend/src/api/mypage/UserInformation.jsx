import { baseAxios } from "../Api";

export async function GetUser(props) {
  try {
    const res = await baseAxios.get(`user/${props}`);
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function GetUserfund(props) {
  try {
    const res = await baseAxios.get(`user/fund/${props}`);
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function PutUser(props) {
  try {
    const res = await baseAxios.patch(`user/patch/${props}`, {
      name: props.name,
      email: props.email,
      password: props.password,
      residence_info: props.residence_info,
      region_key: props.region_key,
      end_date: props.end_date,
      is_ended: props.is_ended,
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function ChangePassword(props) {
  try {
    const res = await baseAxios.patch(
      `user/${localStorage.getItem("id")}/pwd`,
      {
        pwd: props,
      }
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function ChangeRegionAxios(props) {
  try {
    const res = await baseAxios.patch(
      `user/${localStorage.getItem("id")}/region/${props}`,
      {}
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}
