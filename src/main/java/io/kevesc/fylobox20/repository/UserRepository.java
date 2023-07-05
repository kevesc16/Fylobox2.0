package io.kevesc.fylobox20.repository;

import io.kevesc.fylobox20.repository.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    UserEntity findByUsuarioAndPassword(String usuario, String password);



}
