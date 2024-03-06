package com.dream.backend.domain.user;

import com.dream.backend.controller.user.response.UserFundResponse;
import com.dream.backend.domain.region.Region;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Optional;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false, length = 20, updatable = false)
    private String name;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 225)
    private String password;

    @Column(nullable = false, updatable = false, length = 10)
    private int residence_info;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_key")
    private Region region;

    @Column(nullable = true)
    private LocalDateTime end_date;

    @Column(nullable = true)
    private boolean is_ended;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime created_date;

    @Column(nullable = true)
    private int pre_fund;

    @Column(nullable = true)
    private int total_fund;

    @Column(nullable = true)
    private Long account;

    @Column(nullable = true)
    private boolean my_data;

    @Column(nullable = true)
    private LocalDateTime refresh_time;

    @Column(nullable = true)
    private int exited;


    @Builder
    public User(Long id, String name, String email, String password, int residence_info, Region region, LocalDateTime end_date, boolean is_ended, LocalDateTime created_date, int pre_fund, int total_fund, Long account, boolean my_data, LocalDateTime refresh_time) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.residence_info = residence_info;
        this.region = region;
        this.end_date = end_date;
        this.is_ended = is_ended;
        this.created_date = created_date;
        this.pre_fund = pre_fund;
        this.total_fund = total_fund;
        this.account = account;
        this.my_data = my_data;
        this.refresh_time = refresh_time;
    }

    // - - - - - - - - - -비즈니스 로직 - - - -- - - - -

    public UserFundResponse toFundResponse(Optional<User> user) {
        return UserFundResponse.builder()
                .pre_fund(user.get().pre_fund)
                .total_fund(user.get().total_fund)
                .build();
    }

    public void changeRegion(Region region) {
        this.region = region;
    }

    public void changePwd(String pwd) {
        this.password = pwd;
    }

    public void changeMyData() {
        this.my_data = true;
    }

    public void addFund(int supportFund) {
        this.total_fund += supportFund;

    }

    public void addPreFund(int supportFund) {
        this.pre_fund += supportFund;
    }

    public void subtractFund(int supportFund, int status) {

        // status가 1이라면 totalFund - supportFund
        if (status == 1) {
            this.total_fund -= supportFund;
        }
        // status가 2라면   preFund - suportFund
        if (status == 2) {
            this.pre_fund -= supportFund;
        }
    }

    public void exitService(){
        this.exited = 1;
    }


}
