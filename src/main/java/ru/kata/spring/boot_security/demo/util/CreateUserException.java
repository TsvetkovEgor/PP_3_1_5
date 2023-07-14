package ru.kata.spring.boot_security.demo.util;

public class CreateUserException extends RuntimeException{
    public CreateUserException(String msg){
        super(msg);
    }
}
