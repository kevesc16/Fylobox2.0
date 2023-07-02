package io.kevesc.fylobox20.repository;


import io.kevesc.fylobox20.endpoint.User;
import io.kevesc.fylobox20.repository.model.UserEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findByUsuario(String usuario);
    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM UserEntity u WHERE u.usuario = :usuario AND u.password = :password")
    boolean checkCredentials(@Param("usuario") String usuario, @Param("password") String password);

}
