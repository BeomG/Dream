import { baseAxios } from "../Api";

export async function GetExamine(props) {
  try {
    const res = await baseAxios.get(`benefit/${props.user_id}/2`);
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function GetReceive(props) {
  try {
    const res = await baseAxios.get(`benefit/${props.user_id}/1`);
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function PlusWelfare(props) {
  try {
    const res = await baseAxios.patch(
      `benefit/change/${props.user_id}/${props.welfare_id}/${props.status}`
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function CancelWelfare(props) {
  try {
    const res = await baseAxios.patch(
      `benefit/cancel/${props.user_id}/${props.welfare_id}/${props.status}`
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function GetMywelfare(props) {
  try {
    const res = await baseAxios.get(`benefit/${props.user_id}/0`);
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function GetFund(props) {
  try {
    const res = await baseAxios.get(`user/fund/${props.user_id}`);
    return res;
  } catch (e) {
    console.error(e);
  }
}
