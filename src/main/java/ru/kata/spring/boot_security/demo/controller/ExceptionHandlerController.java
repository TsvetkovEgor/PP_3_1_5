package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ru.kata.spring.boot_security.demo.util.CreateUserException;
import ru.kata.spring.boot_security.demo.util.ErrorResponse;

import javax.persistence.EntityNotFoundException;

@ControllerAdvice
public class ExceptionHandlerController {
    @ExceptionHandler(CreateUserException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFoundException(CreateUserException ex) {
        String errorMsg = "Произошла ошибка: " + ex.getMessage();
        ErrorResponse errorResponse = new ErrorResponse(errorMsg);
        return new ResponseEntity<>(errorResponse,HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFoundException(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
}
