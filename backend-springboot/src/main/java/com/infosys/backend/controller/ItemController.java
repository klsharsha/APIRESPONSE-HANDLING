package com.infosys.backend.controller;

import com.infosys.backend.dto.ApiResponse;
import com.infosys.backend.dto.CreateItemRequest;
import com.infosys.backend.model.Item;
import com.infosys.backend.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> root() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "API Server is running!");
        
        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("GET /api/items", "Get all items");
        endpoints.put("GET /api/test", "Random success/error for testing");
        endpoints.put("POST /api/items", "Create new item");
        endpoints.put("DELETE /api/items/:id", "Delete item");
        
        response.put("endpoints", endpoints);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/items")
    public ResponseEntity<ApiResponse<List<Item>>> getAllItems() {
        // Simulate random delay (0-1000ms)
        try {
            Thread.sleep((long) (Math.random() * 1000));
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        List<Item> items = itemService.getAllItems();
        ApiResponse<List<Item>> response = new ApiResponse<>(true, items, items.size());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/test")
    public ResponseEntity<ApiResponse<Map<String, Object>>> test() {
        double random = Math.random();

        // 70% success, 30% failure
        if (random > 0.3) {
            Map<String, Object> data = new HashMap<>();
            data.put("timestamp", System.currentTimeMillis());
            data.put("random", random);
            
            ApiResponse<Map<String, Object>> response = new ApiResponse<>(
                true, 
                data, 
                "Request successful!"
            );
            return ResponseEntity.ok(response);
        } else if (random > 0.15) {
            // Server error
            ApiResponse<Map<String, Object>> response = new ApiResponse<>(false, "Internal server error");
            response.setError("Database connection failed");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } else {
            // Simulate timeout - delay response
            try {
                Thread.sleep(15000); // 15 seconds
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            
            ApiResponse<Map<String, Object>> response = new ApiResponse<>(false, "Request timeout");
            return ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT).body(response);
        }
    }

    @PostMapping("/api/items")
    public ResponseEntity<ApiResponse<Item>> createItem(@Valid @RequestBody CreateItemRequest request) {
        Item newItem = itemService.createItem(request.getName());
        ApiResponse<Item> response = new ApiResponse<>(true, newItem, "Item created successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/api/items/{id}")
    public ResponseEntity<ApiResponse<Item>> deleteItem(@PathVariable Long id) {
        return itemService.deleteItem(id)
                .map(item -> {
                    ApiResponse<Item> response = new ApiResponse<>(true, item, "Item deleted successfully");
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    ApiResponse<Item> response = new ApiResponse<>(false, "Item not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                });
    }
}
