package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.entity.User;

import java.util.List;

public interface UserService {
    List<User> getUsers();

    void saveUser(User user);

    void updateUser(User user);

    User getUser(int id);

    void removeUser(int id);

    User findByEmail(String email);
    User findByUsername(String name);
}