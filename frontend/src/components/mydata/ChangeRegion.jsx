import { Button } from "@mui/material";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import jsonData from "../../assets/data/region.json";
import { ChangeRegionAxios } from "../../api/mypage/UserInformation";

const InfoTextBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 20px;
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

function ChangeRegion() {
  const [regions, setRegions] = useState([]);
  const [subRegions, setSubRegions] = useState([]);
  const [regionKey, setRegionKey] = useState();

  const handleRegionSelect = (e, idx) => {
    const res = jsonData.filter((item) => item.parent_key === idx + 1);
    setSubRegions(res);
  };

  const handleSubRegionSelect = (e, idx) => {
    setRegionKey(subRegions[idx].region_key);
  };

  useEffect(() => {
    const filteredNames = jsonData.slice(1, 18).map((item) => item.name);
    setRegions(filteredNames);
  }, []);

  const submitRegion = async (e) => {
    e.preventDefault();
    await ChangeRegionAxios(regionKey);
    window.alert("거주지가 변경되었습니다.");
    window.location.reload();
  };

  return (
    <>
      <FormBox onSubmit={submitRegion}>
        <TextBox>
          <p>거주지 변경하기</p>
          <Button type="submit">변경하기</Button>
        </TextBox>
        <InfoTextBox>
          <Select required placeholder="시/도" onChange={handleRegionSelect}>
            {regions.map((item, idx) => (
              <Option key={idx} value={idx}>
                {item}
              </Option>
            ))}
          </Select>
          <Select
            required
            placeholder="시/군/구"
            onChange={handleSubRegionSelect}
          >
            {subRegions.map((item, idx) => (
              <Option key={idx} value={idx}>
                {item.name}
              </Option>
            ))}
          </Select>
        </InfoTextBox>
      </FormBox>
    </>
  );
}

export default ChangeRegion;
