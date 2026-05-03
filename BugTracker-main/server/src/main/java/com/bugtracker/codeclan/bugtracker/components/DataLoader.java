package com.bugtracker.codeclan.bugtracker.components;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

    public DataLoader(){

    }

    public void run(ApplicationArguments args){
        // Intentionally left blank.
        // Initial data is loaded from src/main/resources/data.sql only.
    }
}
