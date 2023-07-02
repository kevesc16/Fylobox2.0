package io.kevesc.fylobox20.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.kevesc.fylobox20.endpoint.User;
import io.kevesc.fylobox20.repository.UserRepository;
import io.kevesc.fylobox20.repository.model.UserEntity;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getListUsers() {
        List<UserEntity> allUsers = userRepository.findAll();
        return allUsers.stream().map(this::convertToUser).collect(Collectors.toList());
    }

    public User getUserById(int id) {
        return userRepository.findById(id).map(this::convertToUser).orElse(null);
    }

    public int addUser(User user) {
        UserEntity userEntity = convertToUserEntity(user);
        UserEntity savedUserEntity = userRepository.save(userEntity);
        return savedUserEntity.getId();
    }

    public User deleteUserById(int id) {
        UserEntity userEntity = userRepository.findById(id).orElse(null);
        if (userEntity != null) {
            userRepository.delete(userEntity);
            return convertToUser(userEntity);
        }
        return null;
    }

    public User updateUserById(int id, User modifiedUser) {
        UserEntity userEntity = userRepository.findById(id).orElse(null);
        if (userEntity != null) {
            userEntity.setNombre(modifiedUser.getNombre());
            userEntity.setApellido(modifiedUser.getApellido());
            userEntity.setGenero(modifiedUser.getGenero());
            userEntity.setCorreo(modifiedUser.getCorreo());
            userEntity.setUsuario(modifiedUser.getUsuario());
            userEntity.setPassword(modifiedUser.getPassword());
            userEntity.setRol(modifiedUser.getRol());
            userRepository.save(userEntity);
            return convertToUser(userEntity);
        }
        return null;
    }

    // Helper methods to convert between User and UserEntity
    private UserEntity convertToUserEntity(User user) {
        UserEntity userEntity = new UserEntity();
        userEntity.setNombre(user.getNombre());
        userEntity.setApellido(user.getApellido());
        userEntity.setGenero(user.getGenero());
        userEntity.setCorreo(user.getCorreo());
        userEntity.setUsuario(user.getUsuario());
        userEntity.setPassword(user.getPassword());
        userEntity.setRol(user.getRol());
        return userEntity;
    }

    private User convertToUser(UserEntity userEntity) {
        User user = new User();
        user.setId(userEntity.getId());
        user.setNombre(userEntity.getNombre());
        user.setApellido(userEntity.getApellido());
        user.setGenero(userEntity.getGenero());
        user.setCorreo(userEntity.getCorreo());
        user.setUsuario(userEntity.getUsuario());
        user.setPassword(userEntity.getPassword());
        user.setRol(userEntity.getRol());
        return user;
    }
    /*
    public boolean loginUser(String usuario, String password) {
        // Lógica para buscar al usuario en la base de datos y verificar las credenciales
        // Aquí deberías hacer una consulta a la base de datos para encontrar al usuario
        // con el nombre de usuario (usuario) proporcionado.
        UserEntity userEntity = userRepository.findByUsuario(usuario);

        if (userEntity != null && userEntity.getPassword().equals(password)) {
            return true; // Las credenciales son válidas
        } else {
            return false; // Las credenciales son inválidas
        }
    }

    */



/*
    public boolean loginUser(String usuario, String password) {
        // Lógica para buscar al usuario en la base de datos y verificar las credenciales
        UserEntity userEntity = userRepository.findByUsuario(usuario);


        if (userEntity != null && userEntity.getPassword().equals(password)) {
            return true; // Las credenciales son válidas
        } else {
            return false; // Las credenciales son inválidas
        }
    }*/

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
/*
    public boolean loginUser(String usuario, String password) {
        // Lógica para buscar al usuario en la base de datos y verificar las credenciales
        UserEntity userEntity = userRepository.findByUsuario(usuario);

        // Si el usuario no existe en la base de datos, el inicio de sesión no es válido
        if (userEntity == null) {
            return false;
        }

        // Aquí debes verificar que la contraseña proporcionada coincida con la contraseña almacenada.
        // En una implementación real, asegúrate de que las contraseñas estén almacenadas de forma segura,
        // preferiblemente utilizando técnicas de hashing y salting.

        // Por ejemplo, si la contraseña está almacenada como texto plano, puedes verificar así:
        return userEntity.getPassword().equals(password);

    }

 */

    public boolean loginUser(String usuario, String password) {
        return userRepository.checkCredentials(usuario, password);
    }
}
