package com.infosys.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private Boolean success;
    private T data;
    private String message;
    private Integer count;
    private String error;

    public ApiResponse(Boolean success, T data) {
        this.success = success;
        this.data = data;
    }

    public ApiResponse(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public ApiResponse(Boolean success, T data, String message) {
        this.success = success;
        this.data = data;
        this.message = message;
    }

    public ApiResponse(Boolean success, T data, Integer count) {
        this.success = success;
        this.data = data;
        this.count = count;
    }
}
