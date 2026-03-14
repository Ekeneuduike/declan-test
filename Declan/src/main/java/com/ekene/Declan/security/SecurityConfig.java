package com.ekene.Declan.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

import java.net.http.HttpClient;
@EnableWebSecurity
@Component
public class SecurityConfig {

   @Bean
    public SecurityFilterChain filterChain (HttpSecurity http){
       return http.cors(c -> c.disable()).csrf(c->c.disable()).formLogin(Customizer.withDefaults()).authorizeHttpRequests(h->h.requestMatchers(HttpMethod.GET).permitAll()).build();
    }
}
