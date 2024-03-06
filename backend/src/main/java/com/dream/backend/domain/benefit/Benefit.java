package com.dream.backend.domain.benefit;

import com.dream.backend.domain.user.User;
import com.dream.backend.domain.welfare.Welfare;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Benefit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "benefit_id", nullable = false, updatable = false)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User user;

    @OneToOne
    @JoinColumn(name = "welfare_id", nullable = false, updatable = false)
    private Welfare welfare;

    @Column
    private int status;

    @Column
    private int benefit_cnt;

    @Column
    private boolean is_confirmed;

    @Builder
    public Benefit(Long id, User user, Welfare welfare, int status, int benefit_cnt, boolean is_confirmed) {
        this.id = id;
        this.user = user;
        this.welfare = welfare;
        this.status = status;
        this.benefit_cnt = benefit_cnt;
        this.is_confirmed = is_confirmed;
    }


    //    - - - - - - - - - 비즈니스 로직 - - - - - - - - - - -

    public void changeStatusToNum(User user, int num, int support_fund) {
        //상황1: num이 1이라면, User 의 addFund() 호출해야 한다.
        if (num == 1) {
            user.addFund(support_fund);
            //benefit 의 status 1로 바꿔준다.
            this.status = 1;
        }

        //상황2: num이 2이라면  User 의 addPreFund() 호출해야 한다.
        if (num == 2) {
            user.addPreFund(support_fund);
            //benefit 의 status 2로 바꿔준다.
            this.status = 2;
        }
        this.status = num;
    }

    public void cancelStatus(User user, int status, int support_fund) {
        user.subtractFund(support_fund,status);
        this.status = 0;
    }

}
