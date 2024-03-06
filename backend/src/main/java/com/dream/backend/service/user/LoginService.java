package com.dream.backend.service.user;

import com.dream.backend.controller.user.response.UserLoginResponse;
import com.dream.backend.domain.user.User;
import com.dream.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;

    public UserLoginResponse loginUser(String email, String pwd) {
        Optional<User> user = Optional.ofNullable(userRepository.findByEmailAndPassword(email, pwd));
        UserLoginResponse userLoginResponse = null;
        if (user.get().getExited() == 1) {
            //탈퇴한 회원입니다
//            throw new NoSuchElementException("탈퇴한 회원입니다.");
            return userLoginResponse;
        }
        if (user.isPresent()) {
            userLoginResponse = UserLoginResponse.builder()
                    .id(user.get().getId())
                    .myData(user.get().isMy_data())
                    .build();
            return userLoginResponse;
        } else {
            // 예외 처리: 유저를 찾을 수 없는 경우
            throw new NoSuchElementException("아이디와 비밀번호를 확인하세요");
        }
    }

    public Long exit(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        user.get().exitService(); //회원탈퇴
        return user.get().getId();
    }
}