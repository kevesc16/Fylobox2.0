package io.kevesc.fylobox20.repository;


import io.kevesc.fylobox20.endpoint.User;
import io.kevesc.fylobox20.repository.model.UserEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByRol(String rol);
}
