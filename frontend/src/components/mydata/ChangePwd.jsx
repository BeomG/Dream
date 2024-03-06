import { Button, TextField } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { ChangePassword } from "../../api/mypage/UserInformation";

const InfoTextBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
`;

//정보변경 박스
const FormBox = styled.form`
  width: 90%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  background-color: white;
  box-shadow: 3px 3px 3px 3px lightgray;
  margin-bottom: 20px;
`;

const TextBox = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid lightgray;
`;

const HelperBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
  font-size: 1.5vh;
  white-space: pre-line;
  color: red;
`;

function ChangePwd(props) {
  const pwd = props.curPwd;
  const [curPwd, setCurPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");

  //영문,숫자,특수기호를 포함한 8자리 이상, 15자리 이하
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,15}$/;
  const [isCurValid, setIsCurValid] = useState(false);
  const [okCurValid, setOkCurValid] = useState(false);
  const [isPwdCheckValid, setIsPwdCheckValid] = useState(false);
  const [okPwdCheckValid, setOkPwdCheckValid] = useState(false);

  const submitPassword = async (e) => {
    e.preventDefault();
    await ChangePassword(newPwd);
    window.alert("비밀번호가 변경되었습니다.");
    window.location.reload();
  };

  const changeCurPwd = (e) => {
    setCurPwd(e.target.value);
    setIsCurValid(true);
  };

  const changeNewPwd = (e) => {
    setNewPwd(e.target.value);
  };

  const changePwdCheck = (e) => {
    setPwdCheck(e.target.value);
    setIsPwdCheckValid(true);
  };

  useEffect(() => {
    if (curPwd === pwd) {
      setOkCurValid(true);
    } else {
      setOkCurValid(false);
    }
  }, [curPwd, pwd]);

  useEffect(() => {
    if (newPwd && newPwd === pwdCheck) {
      setOkPwdCheckValid(true);
    } else {
      setOkPwdCheckValid(false);
    }
  }, [newPwd, pwdCheck]);

  return (
    <>
      <FormBox onSubmit={submitPassword}>
        <TextBox>
          <p>비밀번호 변경</p>
          {okCurValid && okPwdCheckValid && passwordRegEx.test(newPwd) ? (
            <Button type="submit">변경하기</Button>
          ) : (
            <Button type="submit" disabled>
              변경하기
            </Button>
          )}
        </TextBox>
        <InfoTextBox>
          현재 비밀번호 :
          <TextField
            id="curPwd"
            size="small"
            sx={{ width: "50%" }}
            required
            type="password"
            onChange={changeCurPwd}
          />
        </InfoTextBox>
        {isCurValid && (
          <HelperBox>
            {okCurValid ? (
              <p style={{ margin: 0, color: "green" }}>*비밀번호가 같습니다.</p>
            ) : (
              <p style={{ margin: 0 }}>*현재 비밀번호가 다릅니다.</p>
            )}
          </HelperBox>
        )}

        <InfoTextBox>
          새로운 비밀번호 :
          <TextField
            id="pwd"
            size="small"
            sx={{ width: "50%" }}
            required
            type="password"
            onChange={changeNewPwd}
          />
        </InfoTextBox>
        {!passwordRegEx.test(newPwd) && (
          <HelperBox>
            <p style={{ margin: 0 }}>
              {"*영문,숫자,특수기호를 포함한\n8자리 이상, 15자리 이하"}
            </p>
          </HelperBox>
        )}
        <InfoTextBox>
          비밀번호 확인 :
          <TextField
            id="pwdCheck"
            size="small"
            sx={{ width: "50%" }}
            required
            type="password"
            onChange={changePwdCheck}
          />
        </InfoTextBox>
        {isPwdCheckValid && (
          <HelperBox>
            {okPwdCheckValid ? (
              <p style={{ margin: 0, paddingBottom: "10px", color: "green" }}>
                *비밀번호가 같습니다.
              </p>
            ) : (
              <p style={{ margin: 0, paddingBottom: "10px" }}>
                *비밀번호가 같지 않습니다.
              </p>
            )}
          </HelperBox>
        )}
      </FormBox>
    </>
  );
}

export default ChangePwd;
