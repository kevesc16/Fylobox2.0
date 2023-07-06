package io.kevesc.fylobox20.endpoint;

import io.kevesc.fylobox20.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getListUsers();
        return ResponseEntity.ok(users);
    }
    @PostMapping("/users/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest userLoginRequest) {
        String usuario = userLoginRequest.getUsuario();
        String password = userLoginRequest.getPassword();


        boolean loginSuccess = userService.loginUser(usuario, password);

        if (loginSuccess) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(true);
        } else {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(false);
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") int id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/users")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        int userId = userService.addUser(user);
        return ResponseEntity.ok("Usuario creado con ID: " + userId);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") int id, @RequestBody User modifiedUser) {
        User updatedUser = userService.updateUserById(id, modifiedUser);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable("id") int id) {
        User deletedUser = userService.deleteUserById(id);
        if (deletedUser != null) {
            return ResponseEntity.ok(deletedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        int userId = userService.addUser(user);
        return ResponseEntity.ok("Registro exitoso con ID: " + userId);
    }
}
