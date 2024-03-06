import { React, useEffect, useState } from "react";
import { styled } from "styled-components";
import { DetailWelfare } from "../../api/welfare/Welfare";
import { useLocation, useNavigate } from "react-router-dom";
import { useDrag } from "react-dnd";
import jsonData from "../../assets/data/region.json";
import { green } from "@mui/material/colors";

// 카드
const StyledCard = styled.div`
  width: 85%;
  height: 20vh;
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isDragging
      ? "rgba(0,0,0,0.5)"
      : props.backgroundColor ||
        welfareTypeColors[props.welfare_type.slice(0, 2)] ||
        "#000000"};

  margin-bottom: 2%;
`;
const Poster = styled.img`
  width: 50%;
  height: 95%;
  object-fit: fill;
  margin: 5% 0% 5% 2%;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  text-align: left;
  font-size: 50%;
  margin: 0% 5% 5% 5%;
`;

// 모달
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 모달 외부 배경 색상 및 투명도 조절 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  font-size: 2vh;
  border-radius: 10px;
  z-index: 9999; // Add this line
`;

const ModalPoster = styled.img`
  width: 95%;
  height: 50%;
  object-fit: fill;
  margin: 3% 0% 0% 2%;
`;

const ModalContant = styled.div`
  flex: 1;
  overflow: auto;
  margin: 0% 5% 5% 5%;
  overflow-x: hidden;
`;

// 포스터 모달
const FullscreenModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: scroll;
`;

const FullscreenImage = styled.img`
  width: 100vw;
  height: auto;
  z-index: 999;
`;

const welfareTypeColors = {
  소득: "#EEA8A8",
  주거: "#F8EBBE",
  금융: "#9CEFEA",
  교육: "#EEBEF2",
  취업: "#B0D5F8",
  법률: "#f98e11",
  건강: "#ecd78d",
  기타: "#5cb85c",
};
// 포스터 모달
function FullscreenImageModal({ src, onClose }) {
  return (
    <FullscreenModalBackground onClick={onClose}>
      <FullscreenImage src={src} />
    </FullscreenModalBackground>
  );
}

// 모달
function Modal({ data, onClose }) {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const closeModal = () => {
    onClose();
  };

  // 포스터 모달 열기
  const [fullscreenVisible, setFullscreenVisible] = useState(false);
  const [d_day, setD_day] = useState("");
  const [totalRegion, setTotalRegion] = useState("");
  const handlePosterClick = () => {
    setFullscreenVisible(true);
  };

  useEffect(() => {
    window.addEventListener("popstate", function (e) {
      e.preventDefault();
      closeModal();
    });
  });

  useEffect(() => {
    const regionName = jsonData.find(
      (item) => data.regionKey === item.region_key
    );
    const parentRegion =
      jsonData.find((item) => {
        if (regionName.parent_key !== null) {
          return regionName.parent_key === item.region_key;
        } else {
          return false;
        }
      }) || "";
    const totalRegionVal =
      (parentRegion ? parentRegion.name + " " : "") + regionName.name;
    setTotalRegion(totalRegionVal);
    const endDate = new Date(data.end_date).getTime();
    const now = new Date().getTime();
    const remainingTime = endDate - now;
    if (remainingTime <= 0) {
      setD_day("마감");
    } else {
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setD_day(`${days}일 ${hours}시간`);
    }
  }, [data]);
  return (
    <ModalBackground onClick={closeModal}>
      <ModalContainer onClick={stopPropagation}>
        <ModalPoster
          src={`/welfare/${data.img}.jpg`}
          onClick={handlePosterClick}
        />

        {fullscreenVisible && (
          <FullscreenImageModal
            src={`/welfare/${data.img}.jpg`}
            onClose={() => setFullscreenVisible(false)}
          />
        )}

        <ModalContant onClick={stopPropagation}>
          <h2>{data.name}</h2>
          <p>{data.description_origin}</p>
          <p>모집 지역 : {totalRegion}</p>
          <p>
            모집 기한 : {data.start_date.slice(0, -9)} ~{" "}
            {data.end_date.slice(0, -9)}
          </p>
          <p style={{ color: d_day !== "마감" ? "blue" : "red" }}>
            {d_day !== "마감" ? `D-DAY : ${d_day}` : "마감"}
          </p>
          <p>기관명 : {data.organization}</p>
          <p>
            총 지원 금액 :{" "}
            {data.support_fund !== 0
              ? `${
                  data.support_fund.toString().length > 4
                    ? `${data.support_fund.toString().slice(0, -4)}만원`
                    : `${data.support_fund}원`
                } / ${data.support_period}달`
              : "없음"}
          </p>
          <p>제출 서류 : {data.submission}</p>
          <p>신청 방법 : {data.route}</p>
          <p>
            신청 url:{" "}
            <a href={data.url} target="_blank" rel="noopener noreferrer">
              {data.url}
            </a>
          </p>
        </ModalContant>
      </ModalContainer>
    </ModalBackground>
  );
}

const Card = (props) => {
  // Drag & Drop
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id: props.id, origin: props.origin },
    canDrag: () => props.canDrag !== false,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const navigate = useNavigate();
  const location = useLocation();
  const {
    id,
    cardWidth,
    cardHeight,
    fontSize,
    region,
    support_period,
    support_fund,
    start_date,
    end_date,
    regionKey,
    title,
    welfare_type,
    img,
  } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [welfareData, setWelfareData] = useState(null);
  const [d_day, setD_day] = useState("");
  const [totalRegion, setTotalRegion] = useState("");

  const regionValue = region !== "0" ? region : "전국";
  const supportPeriodValue = support_period || "기간 없음";

  const calculateRemainingMonths = (support_period) => {
    const today = new Date();
    const endDate = new Date(support_period);

    return Math.round((today - endDate) / (1000 * 60 * 60 * 24 * 30) + 1);
  };

  // 데이터 가져오기
  async function handleCardClick(e) {
    if (!modalVisible) {
      try {
        const res = await DetailWelfare(id);
        setWelfareData(res.data);
        setModalVisible(true);
        if (!location.pathname.includes("detail")) {
          navigate(`${location.pathname}/detail`);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      navigate(`${location.pathname.slice(0, -7)}`);
    }
  }
  useEffect(() => {
    const regionName = jsonData.find((item) => regionKey === item.region_key);
    const parentRegion =
      jsonData.find((item) => {
        if (regionName.parent_key !== null) {
          return regionName.parent_key === item.region_key;
        } else {
          return false;
        }
      }) || "";
    const totalRegionVal =
      (parentRegion ? parentRegion.name + " " : "") + regionName.name;
    setTotalRegion(totalRegionVal);
    const endDate = new Date(end_date).getTime();
    const now = new Date().getTime();
    const remainingTime = endDate - now;
    if (remainingTime <= 0) {
      setD_day("마감");
    } else {
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setD_day(`${days}일 ${hours}시간`);
    }
  }, []);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY,
    });
  };
  return (
    <>
      <StyledCard
        onClick={handleCardClick}
        welfare_type={welfare_type}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        fontSize={fontSize}
        title={title}
        region={regionValue}
        start_date={start_date}
        end_date={end_date}
        regionKey={regionKey}
        support_period={supportPeriodValue}
        support_fund={support_fund}
        isDragging={isDragging}
      >
        <Poster
          onTouchMove={handleMouseMove}
          ref={drag}
          src={`/welfare/${img}.jpg`}
          style={{
            minWidth: "50%", // 이미지 스타일을 조절할 수 있습니다.
            height: "95%",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
        />

        {isDragging && (
          <Poster
            src={`/welfare/${img}.jpg`}
            style={{
              width: "100px",
              height: "100px",
              position: "absolute",
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y - 50}px`,
            }}
          />
        )}

        <ContentBox>
          <h2>{title}</h2>
          <p>
            모집 지역 : {totalRegion}
            <br />
            지원 금액 :{" "}
            {support_fund
              ? support_fund.toString().length >= 5
                ? `${support_fund.toString().slice(0, -4)}만원`
                : `${support_fund}원`
              : "없음"}
            <br />
            <p style={{ color: d_day !== "마감" ? "blue" : "red" }}>
              {d_day !== "마감" ? `D-DAY : ${d_day}` : "마감"}
            </p>
            {props.showPeriod && (
              <p style={{ color: "green" }}>
                {calculateRemainingMonths(props.support_period)}달 남았습니다.
              </p>
            )}
          </p>
        </ContentBox>
      </StyledCard>
      {modalVisible && (
        <Modal
          data={welfareData}
          onClose={() => setModalVisible(false)}
          backgroundColor={props.backgroundColor}
        />
      )}
    </>
  );
};

export default Card;
