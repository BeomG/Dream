package com.dream.backend.domain.user.repository;

import com.dream.backend.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    boolean existsByEmail(String username);
    User findByEmailAndPassword(String email, String pwd);
    User findByEmail(String email);
}
