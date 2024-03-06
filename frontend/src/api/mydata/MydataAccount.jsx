import { baseAxios } from "../Api";

export async function RefreshUser() {
  const id = localStorage.getItem("id");
  const status = localStorage.getItem("myData") === "true" ? 1 : 0;
  try {
    const res = await baseAxios.patch(`user/connection/${id}/${status}`, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function BankAll() {
  try {
    const res = await baseAxios.get(`banking/transaction/111010011`, {});
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function BankRange(props) {
  try {
    const res = await baseAxios.patch(
      `banking/transaction/${props.account_number}/${props.before}/${props.after}`,
      {}
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}

export async function MatchWelfare() {
  try {
    const res = await baseAxios.get(
      `banking/transaction/withWelfare/111010011`,
      {}
    );
    return res;
  } catch (e) {
    console.error(e);
  }
}
