package com.ecommerce.controller;

import com.ecommerce.dto.order.CreateOrderRequest;
import com.ecommerce.dto.order.OrderResponse;
import com.ecommerce.dto.order.TransferReferenceRequest;
import com.ecommerce.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) { this.orderService = orderService; }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse create(@Valid @RequestBody CreateOrderRequest request) { return orderService.create(request); }

    @GetMapping("/{id}")
    public OrderResponse get(@PathVariable String id) { return orderService.get(id); }

    @PostMapping("/{id}/transfer-reference")
    public OrderResponse submitTransferReference(@PathVariable String id, @Valid @RequestBody TransferReferenceRequest request) {
        return orderService.submitTransferReference(id, request);
    }

    @GetMapping("/admin")
    public List<OrderResponse> getAll(@RequestHeader(value = "X-Admin-Username", required = false) String admin) {
        requireAdmin(admin);
        return orderService.getAll();
    }

    @PostMapping("/{id}/confirm-payment")
    public OrderResponse confirmPayment(@PathVariable String id, @RequestHeader(value = "X-Admin-Username", required = false) String admin) {
        requireAdmin(admin);
        return orderService.confirmPayment(id);
    }

    private void requireAdmin(String admin) {
        if (!"ADMIN".equals(admin)) throw new org.springframework.web.server.ResponseStatusException(HttpStatus.UNAUTHORIZED, "Yêu cầu quyền admin");
    }
}