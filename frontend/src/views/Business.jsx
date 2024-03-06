import { React, useState, useEffect } from "react"; // useState import
import { styled } from "styled-components";
import Header from "../components/header/Header";
import Card from "../components/card/Card";

// Drag & Drop
import { useDrop } from "react-dnd";

// Icon
import { ReactComponent as PlusIcon } from "../assets/img/Plus_icon.svg";
import { ReactComponent as WhitePlusIcon } from "../assets/img/Vector.svg";
import { ReactComponent as MinusIcon } from "../assets/img/minus.svg";

// API
import {
  GetMywelfare,
  GetReceive,
  GetExamine,
  GetFund,
  PlusWelfare,
  CancelWelfare,
} from "../api/welfare/MyWelfare";

// 사업을 넣는 박스를 갖는 컨테이너
const BusinessContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: calc(100% - 70px);
  margin-top: 70px;
  margin-bottom: 10px;
`;

// 카드를 넣었을 때와 안넣었을 때 박스 공통 설정
const BusinessBasicBox = styled.div`
  background-color: #fff;
  width: 100%;
  margin-bottom: 7%;
  border-radius: 10px;
`;

// 카드를 안넣었을 때 박스
const BusinessNothingBox = styled(BusinessBasicBox)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

// 카드를 넣었을 때 박스
const BusinessBox = styled(BusinessBasicBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BusinessBoxTop = styled.div`
  display: flex;
  width: 115%;
  justify-content: space-around;
  align-items: center;
`;

// 맞춤 지원 사업
const CustomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 100%;
  border-radius: 10px;
`;

const CustomCardBox = styled.div`
  display: flex;
  width: 100%;
  height: 50vh;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Money = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
`;

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30vh;
  justify-content: center;
  gap: 10px;
  overflow-y: scroll;
  flex-wrap: wrap;
`;

const Text = styled.p`
  display: flex;
  align-items: center;
`;

const HR = styled.hr`
  width: 83%;
`;

// 넣은 심사사업이 없을 때
function ExamineNothing(props) {
  // drag & drop
  const [, drop] = useDrop(() => ({
    accept: "card",
    drop: (item) => {
      if (item.origin !== "custom") return;
      props.addExamine(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return (
    <div ref={drop}>
      <BusinessNothingBox>
        <Text>
          <p style={{ color: props.titleColor }}>{props.title}</p>을 넣어주세요
        </Text>
        <WhitePlusIcon width="10%" />
      </BusinessNothingBox>
    </div>
  );
}

// 넣은 지원사업이 없을 때
function ReceiveNothing(props) {
  // drag & drop
  const [, drop] = useDrop(() => ({
    accept: "card",
    drop: (item) => {
      if (item.origin !== "custom") return;
      props.addReceive(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop}>
      <BusinessNothingBox ref={props.ref}>
        <Text>
          <p style={{ color: props.titleColor }}>{props.title}</p>을 넣어주세요
        </Text>
        <WhitePlusIcon width="10%" />
      </BusinessNothingBox>
    </div>
  );
}

// 심사 받고 있는 사업
function ExamineBody(props) {
  // 플러스 마이너스 버튼을 통해 보여지고 안보여지고
  const [isCardVisible, setCardVisible] = useState(false); // State for Card visibility

  // drag & drop
  const [, drop] = useDrop(() => ({
    accept: "card",
    drop: (item) => {
      if (item.origin !== "custom") return;
      props.addExamine(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop}>
      <BusinessBox>
        <BusinessBoxTop>
          <p style={{ color: props.titleColor }}>{props.title}</p>
          {isCardVisible ? (
            <MinusIcon
              width="6%"
              onClick={() => setCardVisible(!isCardVisible)}
            />
          ) : (
            <PlusIcon
              width="6%"
              onClick={() => setCardVisible(!isCardVisible)}
            />
          )}{" "}
        </BusinessBoxTop>
        <HR />
        <Money>
          <p>매 달</p>
          <p style={{ color: props.moneyColor }}>{props.money}₩</p>
          <p>{props.comment}</p>
        </Money>
        {isCardVisible && (
          <CardContainer>
            {props.examine.map((welfare) => (
              <Card
                key={welfare.id}
                id={welfare.id}
                title={welfare.name}
                regionKey={welfare.regionKey}
                start_date={welfare.start_date}
                end_date={welfare.end_date}
                support_period={welfare.start_date}
                support_fund={welfare.support_fund}
                welfare_type={welfare.welfareType}
                img={welfare.img}
                origin="examine"
              />
            ))}{" "}
          </CardContainer>
        )}
      </BusinessBox>
    </div>
  );
}

// 지원 받고 있는 사업
function ReceiveBody(props) {
  // 플러스 마이너스 버튼을 통해 보여지고 안보여지고
  const [isCardVisible, setCardVisible] = useState(false); // State for Card visibility

  // drag & drop
  const [, drop] = useDrop(() => ({
    accept: "card",
    drop: (item) => {
      if (item.origin !== "custom") return;
      props.addReceive(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop}>
      <BusinessBox ref={props.ref}>
        <BusinessBoxTop>
          <p style={{ color: props.titleColor }}>{props.title}</p>
          {isCardVisible ? (
            <MinusIcon
              width="6%"
              onClick={() => setCardVisible(!isCardVisible)}
            />
          ) : (
            <PlusIcon
              width="6%"
              onClick={() => setCardVisible(!isCardVisible)}
            />
          )}{" "}
        </BusinessBoxTop>
        <HR />
        <Money>
          <p>매 달</p>
          <p style={{ color: props.moneyColor }}>{props.money}₩</p>
          <p>{props.comment}</p>
        </Money>
        {isCardVisible && (
          <CardContainer>
            {props.receiveWelfares.map((welfare) => (
              <Card
                key={welfare.id}
                id={welfare.id}
                title={welfare.name}
                regionKey={welfare.regionKey}
                start_date={welfare.start_date}
                end_date={welfare.end_date}
                support_period={welfare.start_date}
                support_fund={welfare.support_fund}
                welfare_type={welfare.welfareType}
                img={welfare.img}
                origin="receive"
                showPeriod="true"
              />
            ))}{" "}
          </CardContainer>
        )}
      </BusinessBox>
    </div>
  );
}

// 맞춤 지원 사업
function CustomBusinesss({
  welfareData,
  setWelfareData,
  setExamine,
  setReceive,
  setMoney,
}) {
  const fetchData = async (apiFunc, setStateFunc) => {
    const userId = localStorage.getItem("id");
    if (userId) {
      try {
        const response = await apiFunc({ user_id: userId });
        setStateFunc(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const cancelReceive = async (id) => {
    const userId = localStorage.getItem("id");
    const response = await CancelWelfare({
      user_id: userId,
      welfare_id: id,
      status: 1,
    });

    if (response.status === 200) {
      // Fetch new data after the operation
      fetchData(GetMywelfare, setWelfareData);
      fetchData(GetExamine, setExamine);
      fetchData(GetReceive, setReceive);
      fetchData(GetFund, setMoney);
    }
  };

  const cancelExamine = async (id) => {
    const userId = localStorage.getItem("id");
    const response = await CancelWelfare({
      user_id: userId,
      welfare_id: id,
      status: 2,
    });

    if (response.status === 200) {
      // Fetch new data after the operation
      fetchData(GetMywelfare, setWelfareData);
      fetchData(GetExamine, setExamine);
      fetchData(GetReceive, setReceive);
      fetchData(GetFund, setMoney);
    }
  };

  // 로컬 스토리지에서 id가져오기
  useEffect(() => {
    const fetchWelfareData = async () => {
      const userId = localStorage.getItem("id");
      if (userId) {
        // 가져왔다면, id를 이용해서 API보내기
        try {
          const response = await GetMywelfare({ user_id: userId });
          console.log(response);
          setWelfareData(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchWelfareData();
  }, []);

  const [, drop] = useDrop(() => ({
    accept: "card",
    drop: (item) => {
      if (item.origin === "examine") {
        cancelExamine(item.id);
      } else if (item.origin === "receive") {
        cancelReceive(item.id);
      }
    },
  }));

  return (
    <CustomContainer ref={drop}>
      <p>맞춤 지원 사업</p>
      <HR />
      <CustomCardBox>
        {welfareData.map((welfare) => (
          <Card
            key={welfare.id}
            id={welfare.id}
            title={welfare.name}
            regionKey={welfare.regionKey}
            start_date={welfare.start_date}
            end_date={welfare.end_date}
            support_period={welfare.start_date}
            support_fund={welfare.support_fund}
            welfare_type={welfare.welfareType}
            img={welfare.img}
            origin="custom"
          />
        ))}
      </CustomCardBox>
    </CustomContainer>
  );
}

// 페이지 전체
function Business() {
  const [examine, setExamine] = useState([]);
  const [receive, setReceive] = useState([]);
  const [money, setMoney] = useState();
  const [welfareData, setWelfareData] = useState([]);
  const userId = localStorage.getItem("id");

  // 공통으로 사용하는 데이터 fetch 함수
  const fetchData = async (apiFunc, setStateFunc) => {
    const userId = localStorage.getItem("id");
    if (userId) {
      try {
        const response = await apiFunc({ user_id: userId });
        setStateFunc(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData(GetExamine, setExamine); // 심사 중인 지원 사업 데이터 fetch
    fetchData(GetReceive, setReceive); // 지원 받고 있는 사업 정보 fetch
    fetchData(GetFund, setMoney); // Money fetch
    fetchData(GetMywelfare, setWelfareData);
  }, []);

  const addReceive = async (id) => {
    // Check if the item is already in the list
    const alreadyExists = receive.some((item) => item.id === id);
    if (!alreadyExists) {
      const response = await PlusWelfare({
        user_id: userId,
        welfare_id: id,
        status: 1,
      });
      console.log(response);
      if (response.status === 200) {
        // Fetch new data after the operation
        fetchData(GetExamine, setExamine);
        fetchData(GetReceive, setReceive);
        fetchData(GetFund, setMoney);
        fetchData(GetMywelfare, setWelfareData);
      }
    }
  };

  const addExamine = async (id) => {
    // Check if the item is already in the list
    const alreadyExists = examine.some((item) => item.id === id);
    if (!alreadyExists) {
      const response = await PlusWelfare({
        user_id: userId,
        welfare_id: id,
        status: 2,
      });
      if (response.status === 200) {
        // Fetch new data after the operation
        fetchData(GetExamine, setExamine);
        fetchData(GetReceive, setReceive);
        fetchData(GetFund, setMoney);
        fetchData(GetMywelfare, setWelfareData);
      }
    }
  };

  return (
    <>
      <Header />
      <BusinessContainer>
        {examine.length > 0 && money ? (
          <ExamineBody
            addExamine={addExamine}
            examine={examine}
            title="심사 중인 지원 사업"
            titleColor="#F66262"
            money={money.pre_fund}
            moneyColor="#30BC19"
            comment="더 받을 수 있습니다."
          />
        ) : (
          <ExamineNothing
            addExamine={addExamine}
            title="심사 중인 지원 사업"
            titleColor="#F66262"
          />
        )}

        {receive.length > 0 && money ? (
          <ReceiveBody
            addReceive={addReceive}
            receiveWelfares={receive}
            title="지원 받고 있는 사업"
            titleColor="#006FFD"
            money={money.total_fund}
            moneyColor="#30BC19"
            comment="지원 받고 있습니다."
          />
        ) : (
          <ReceiveNothing
            addReceive={addReceive}
            title="지원 받고 있는 사업"
            titleColor="#006FFD"
          />
        )}

        <CustomBusinesss
          setExamine={setExamine}
          setReceive={setReceive}
          setMoney={setMoney}
          welfareData={welfareData}
          setWelfareData={setWelfareData}
        />
      </BusinessContainer>
    </>
  );
}

export default Business;
