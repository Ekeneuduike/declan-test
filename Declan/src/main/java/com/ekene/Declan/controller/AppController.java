package com.ekene.Declan.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/api/declan")
@RestController
public class AppController {


    @GetMapping("")

    public String getGreeting() {
        return "hello the server is working as expected";
    }
}
