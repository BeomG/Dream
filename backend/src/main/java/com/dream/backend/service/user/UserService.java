package com.dream.backend.service.user;

import com.dream.backend.controller.ApiResponse;
import com.dream.backend.controller.user.response.UserLoginResponse;
import com.dream.backend.controller.user.response.UserResponse;
import com.dream.backend.domain.benefit.Benefit;
import com.dream.backend.domain.benefit.repostiory.BenefitRepository;
import com.dream.backend.domain.region.Region;
import com.dream.backend.domain.region.repository.RegionRepository;
import com.dream.backend.domain.transaction.Transaction;
import com.dream.backend.domain.transaction.repository.TransactionRepository;
import com.dream.backend.domain.user.User;
import com.dream.backend.domain.user.repository.UserRepository;
import com.dream.backend.domain.welfare.Welfare;
import com.dream.backend.domain.welfare.repository.WelfareRepository;
import com.dream.backend.service.benefit.BenefitService;
import com.dream.backend.service.qualification.QualificationService;
import com.dream.backend.service.user.dto.JoinUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final RegionRepository regionRepository;
    private final WelfareRepository welfareRepository;
    private final TransactionRepository transactionRepository;
    private final BenefitRepository benefitRepository;

    private final QualificationService qualificationService;
    private final BenefitService benefitService;

    public ApiResponse<UserLoginResponse> joinUser(JoinUserDto dto, boolean type) {
        //이메일 중복 검사
        User user = null;
        boolean flag = userRepository.existsByEmail(dto.getEmail());
        if(flag){
            user = userRepository.findByEmail(dto.getEmail());
        }
        if(flag && user.getExited()!=1){
            return ApiResponse.of(HttpStatus.BAD_REQUEST, "중복된 이메일입니다.", null);
        }
        Optional<Region> savedRegion = regionRepository.findById(dto.getRegionKey());
        user = dto.toEntity(savedRegion, type);
        User saveduser = userRepository.save(user);

        int my_data = 1;
        if (!type) my_data = 0;
        // - - 비즈니스 로직 [사용자 거주 지역 코드]
        Long myRegion = dto.getRegionKey();
        connectionMyData(user.getId(), my_data, 0);

/*
        // - - 비즈니스 로직 [만 나이 계산기]
        //user 주민번호 필요, user createdDate 필요
        int my = saveduser.getResidence_info();

        int age = getAge(saveduser.getResidence_info(), String.valueOf(saveduser.getCreated_date()));
        System.out.println("만 나이 계산 성공?: " + age);


        //사용자 자격조건에 맞는 복지 식별키 리스트 가져오기
        List<Long> getUserWelfareKey = qualificationService.getUserWelfareKey(age, myRegion);

        //자격 조건 테이블에서 사용자 만 나이, 지역 키 , 나이로 복지식별키 구분
        //순회하면서 현재 사용자 id와 리스트이 key와 status[null]로 사용자복지정보 등록
        System.out.print("size: " + getUserWelfareKey.size() + "\n사용자 맞춤형 복지 PK:");
        for (int i = 0; i < getUserWelfareKey.size(); i++) {
            System.out.print(getUserWelfareKey.get(i) + " ");
        }
        benefitService.addUserBenefit(saveduser.getId(), getUserWelfareKey, 0);

        //마이데이터 불러오기를 한 경우,
        List<Long> getFilteredWelfareKey = new ArrayList<>();
        if (type) {
            //마이데이터 연결해야하면, getUserWelfareKey 에 해당하는 복지입금코드가죠오기
            List<String> welfareCodeList = new ArrayList<>();
            for (int i = 0; i < getUserWelfareKey.size(); i++) { //2 3 6
                Long welfare_key = getUserWelfareKey.get(i);
                Optional<Welfare> welfare = welfareRepository.findById(welfare_key);
                String welfare_code = welfare.get().getWelfare_code(); //BVE ABC ABC

                if (welfare_code != null) {
                    System.out.println("거래 내역코드 : " + welfare_code);
                    Optional<Transaction> transaction = transactionRepository.findByTranDesc(welfare_code); //사용자 거래 내역에서 ABC를 찾는다
                    if (transaction.isPresent()) {
                        System.out.println("거래내역과 복지 코드 매칭: " + transaction.get().getTranDesc());

                        //같은 것이 존재한다면
                        //+ 기간 설정 필요
                        //+ 거래내역 테이블에서 거래명(ABC자립복지)에 입금거래코드(ABC) 가 포함된 것을 찾아서 비교하여 같다면 welfare_id를 가져온다.

                        //해당 getUserWelfareKey.get(i)를 welfare_id로 가진 자격정보의 status 변경한다.
                        System.out.println("필터된 복지 카드 식별키: " + welfare_key + " " + saveduser.getId());
                        //user_id 와 welfare_key가 같으면 바꿔줘.,
                        Optional<Benefit> benefit = benefitRepository.findByUser_IdAndWelfare_Id(saveduser.getId(), welfare_key);
                        benefit.get().changeStatusToNum(saveduser, 1, welfare.get().getSupport_fund());


                    }
                }
            }
        }
        */

        UserLoginResponse response = UserLoginResponse.builder()
                .id(saveduser.getId())
                .myData(saveduser.isMy_data())
                .build();
        return ApiResponse.ok(response);
    }

    public Optional<User> getUserFund(Long userId) {
        return userRepository.findById(userId);
    }

    public UserResponse getUserInfo(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        UserResponse response = toUserResponse(user);
        return response;
    }

    public UserResponse changeUserRegion(Long userId, Long regionKey) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Region> savedRegion = regionRepository.findById(regionKey);
        user.get().changeRegion(savedRegion.get());
        //수혜, 심사중인 것 건들지 말고, 추천 목록만 삭제
        benefitRepository.deleteAllByIdAndStatus(user.get().getId(), 0);
        // 맞춤형 지역 사업만 보여주기
        connectionMyData(user.get().getId(), 0, 0);
        UserResponse userResponse = toUserResponse(user);
        return userResponse;
    }

    public UserResponse changeUserPwd(Long userId, String pwd) {
        Optional<User> user = userRepository.findById(userId);
        System.out.println("바뀐 비밀번호: " + pwd);
        user.get().changePwd(pwd);
        UserResponse userResponse = toUserResponse(user);
        return userResponse;
    }


    //마이데이터 연결하기
    public Long connectionMyData(Long user_id, int my_data, int isOnlyConnection) {
        Optional<User> savedUser = userRepository.findById(user_id);


        //회원가입이 아니라 , 리프레시 기능으로 작동할 때에는 아래 주석이 통해야한다.
        //마이데이터 미연결 회원은 연결상태로 바꿔준다.
        if (isOnlyConnection==1 && my_data == 0) {
            my_data=1;
            savedUser.get().changeMyData();
        }


        int age = getAge(savedUser.get().getResidence_info(), String.valueOf(savedUser.get().getCreated_date()));
        Long myRegion = savedUser.get().getRegion().getId();

        List<Long> getUserWelfareKey = qualificationService.getUserWelfareKey(age, myRegion);

        //자격 조건 테이블에서 사용자 만 나이, 지역 키 , 나이로 복지식별키 구분
        //순회하면서 현재 사용자 id와 리스트이 key와 status[null]로 사용자복지정보 등록
        if (isOnlyConnection == 0) {
            System.out.print("size: " + getUserWelfareKey.size() + "\n 사용자 맞춤형 복지 PK:\n");
            for (int i = 0; i < getUserWelfareKey.size(); i++) {
                System.out.print(getUserWelfareKey.get(i) + " ");
            }

            benefitService.addUserBenefit(savedUser.get().getId(), getUserWelfareKey, 0);
        }

        //여기서 마이데이터 불러오기 유무
        //마이데이터 불러오기를 한 경우,
        //마이데이터 연결해야하면, getUserWelfareKey 에 해당하는 복지입금코드가죠오기

        if (my_data == 1) {

            for (int i = 0; i < getUserWelfareKey.size(); i++) { //2 3 6
                Long welfare_key = getUserWelfareKey.get(i);
                Optional<Welfare> welfare = welfareRepository.findById(welfare_key);
                String welfare_code = welfare.get().getWelfareCode(); //BVE ABC ABC

                System.out.println("거래 내역코드 : " + welfare_code);

                if (welfare_code != null) {
                    System.out.println("거래 내역코드 : " + welfare_code);
                    Optional<Transaction> transaction = transactionRepository.findByTranDesc(welfare_code); //사용자 거래 내역에서 ABC를 찾는다
                    if (transaction.isPresent()) {
                        System.out.println("거래내역과 복지 코드 매칭: " + transaction.get().getTranDesc());

                        //같은 것이 존재한다면
                        //+ 기간 설정 필요
                        //+ 거래내역 테이블에서 거래명(ABC자립복지)에 입금거래코드(ABC) 가 포함된 것을 찾아서 비교하여 같다면 welfare_id를 가져온다.

                        //해당 getUserWelfareKey.get(i)를 welfare_id로 가진 자격정보의 status 변경한다.
                        System.out.println("필터된 복지 카드 식별키: " + welfare_key + " " + savedUser.get().getId());
                        //user_id 와 welfare_key가 같으면 바꿔줘.
                        Optional<Benefit> benefit = benefitRepository.findByUser_IdAndWelfare_Id(savedUser.get().getId(), welfare_key);
                        benefit.get().changeStatusToNum(savedUser.get(), 1, welfare.get().getSupport_fund());
                        System.out.println("복지금액: "+welfare.get().getSupport_fund()+" 사용자 총 금액"+savedUser.get().getTotal_fund());

                    }
                }
            }
        }

        return savedUser.get().getId();
    }


    //    - - - - - - - - - 비즈니스 로직 - - - - - - - - -
    public UserResponse toUserResponse(Optional<User> user) {
        return UserResponse.builder()
                .name(user.get().getName())
                .email(user.get().getEmail())
                .regionKey(user.get().getRegion().getId())
                .age(getAge(user.get().getResidence_info(), String.valueOf(user.get().getCreated_date())))
                .password(user.get().getPassword())
                .build();
    }


    //만 나이 계산 함수 작성
    public int getAge(int residenceInfo, String now) {
        //순서대로 : 사용자 생년/ 월,일
        int userBirthY = residenceInfo / 100000 + 1900;
        int userBirthMM = (residenceInfo % 100000) / 10;

        //만 나이 계산을 위한 현재 시간 파싱, 순서대로 년도 / 월,일
        int year = Integer.parseInt(now.substring(0, 4));
        int birth = Integer.parseInt(now.substring(5, 7) + now.substring(8, 10));

        //만 나이 계산 로직
        int age = year - userBirthY;
        if (userBirthMM >= birth) age -= 1;

        return age;

    }

}