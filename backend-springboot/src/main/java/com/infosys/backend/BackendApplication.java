package com.infosys.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
        System.out.println("\n🚀 Backend server running on http://localhost:8080");
        System.out.println("📡 API endpoints available at http://localhost:8080/api");
        System.out.println("✅ CORS enabled for frontend\n");
    }
}
