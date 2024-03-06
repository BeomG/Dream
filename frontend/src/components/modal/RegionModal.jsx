import { React, useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import jsonData from "../../assets/data/region.json";

// 지역 모달
const RegionModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 80%;
  max-width: 400px;
  height: 30%;
  border-radius: 10px;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoxContainer = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: space-around;
`;

const FirstKeyBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const SecondKeyBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// 지역 모달
function RegionModal({ setRegionKeyInParent, onClose }) {
  const [regionKey, setRegionKey] = useState();
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [subRegions, setSubRegions] = useState([]);
  const [selectedRegionText, setSelectedRegionText] = useState("시/도 ▼");
  const [selectedSubRegionText, setSelectedSubRegionText] =
    useState("시/군/구 ▼");

  // 첫번째 박스 눌렀을 떄
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSelectedRegionText(region);
    setIsFirstDropdownView(false);
    setSelectedSubRegionText("시/군/구 ▼");

    const curRegion = jsonData.find((item) => item.name === region);
    setRegionKey(curRegion.region_key);
    const selectedRegionData = jsonData.filter(
      (item) => item.parent_key === curRegion.region_key
    );
    if (selectedRegionData) {
      const subRegionData = selectedRegionData.map((item) => item.name);
      setSubRegions(subRegionData);
    } else {
      setSubRegions([]);
    }
  };

  // 두번쨰 박스 눌렀을 때
  const handleSubRegionSelect = (region) => {
    setSelectedSubRegionText(region);
    setIsSecondDropdownView(false);

    const curRegion = jsonData.find((item) => item.name === region);
    setRegionKey(curRegion.region_key);
  };

  useEffect(() => {
    const filteredNames = jsonData.slice(0, 18).map((item) => item.name);
    setRegions(filteredNames);
  }, []);

  const [isFirstDropdownView, setIsFirstDropdownView] = useState(false);
  const [isSecondDropdownView, setIsSecondDropdownView] = useState(false);

  const handleClickFirstDropdown = () => {
    setIsFirstDropdownView(!isFirstDropdownView);
  };

  const handleClickSecondDropdown = () => {
    console.log(selectedRegion);
    setIsSecondDropdownView(!isSecondDropdownView);
  };

  const handleButtonClick = () => {
    if (regionKey) {
      setRegionKeyInParent(regionKey);
    } else if (regionKey === 0) {
      setRegionKeyInParent("");
    }
    onClose(); // 모달 닫기
  };

  return (
    <RegionModalContainer className="RegionModalContainer">
      <BoxContainer className="BoxContainer">
        <FirstKeyBox className="FirstKeyBox">
          <Button
            text={selectedRegionText}
            onClick={handleClickFirstDropdown}
            background="none"
            color="black"
            width="100%"
            fontFamily="surround"
          />
          {isFirstDropdownView && (
            <Dropdown items={regions} onItemClick={handleRegionSelect} />
          )}
        </FirstKeyBox>
        <SecondKeyBox className="SecondKeyBox">
          <Button
            text={selectedSubRegionText}
            onClick={handleClickSecondDropdown}
            background="none"
            color="black"
            width="100%"
            fontFamily="surround"
          />
          {isSecondDropdownView && (
            <Dropdown items={subRegions} onItemClick={handleSubRegionSelect} />
          )}
        </SecondKeyBox>
      </BoxContainer>
      <Button
        onClick={handleButtonClick}
        background-color="#006ffd"
        color="white"
        border="10px"
        height="18%"
        fontFamily="surround"
      >
        지역 변경 완료
      </Button>
    </RegionModalContainer>
  );
}

export default RegionModal;
