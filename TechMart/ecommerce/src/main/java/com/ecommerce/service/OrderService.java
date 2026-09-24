package com.ecommerce.service;

import com.ecommerce.dto.order.CreateOrderRequest;
import com.ecommerce.dto.order.OrderResponse;
import com.ecommerce.dto.order.TransferReferenceRequest;
import com.ecommerce.entity.Order;
import com.ecommerce.repository.OrderRepository;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ObjectMapper objectMapper;
    private final EmailNotificationService emailNotificationService;

    public OrderService(OrderRepository orderRepository, ObjectMapper objectMapper, EmailNotificationService emailNotificationService) {
        this.orderRepository = orderRepository;
        this.objectMapper = objectMapper;
        this.emailNotificationService = emailNotificationService;
    }

    @Transactional
    public OrderResponse create(CreateOrderRequest request) {
        try {
            String id = request.id() == null || request.id().isBlank() ? "ORD-" + System.currentTimeMillis() : request.id();
            String paymentStatus = "BANK_TRANSFER".equals(request.paymentMethod()) ? "PENDING" : "CONFIRMED";
            Order order = new Order(id, Instant.now(), request.fullName().trim(), request.phone().trim(), request.email(),
                    request.address(), request.note(), request.paymentMethod(), request.subtotal(), request.shippingFee(),
                    request.total(), "PENDING", paymentStatus, null, objectMapper.writeValueAsString(request.items()));
            Order savedOrder = orderRepository.save(order);
            emailNotificationService.sendOrderCreated(savedOrder);
            return OrderResponse.from(savedOrder, objectMapper);
        } catch (JacksonException exception) {
            throw new IllegalStateException("Không thể lưu sản phẩm trong đơn hàng", exception);
        }
    }

    public OrderResponse get(String id) {
        return OrderResponse.from(find(id), objectMapper);
    }

    public List<OrderResponse> getAll() {
        return orderRepository.findAll().stream().map(order -> OrderResponse.from(order, objectMapper)).toList();
    }

    @Transactional
    public OrderResponse submitTransferReference(String id, TransferReferenceRequest request) {
        Order order = find(id);
        if (!"BANK_TRANSFER".equals(order.getPaymentMethod())) throw new ResponseStatusException(CONFLICT, "Đơn hàng không dùng chuyển khoản");
        order.setBankTransferLast4(request.last4());
        return OrderResponse.from(orderRepository.save(order), objectMapper);
    }

    @Transactional
    public OrderResponse confirmPayment(String id) {
        Order order = find(id);
        if (!"BANK_TRANSFER".equals(order.getPaymentMethod()) || order.getBankTransferLast4() == null) {
            throw new ResponseStatusException(CONFLICT, "Đơn hàng chưa có mã giao dịch chuyển khoản");
        }
        order.setPaymentStatus("CONFIRMED");
        order.setStatus("COMPLETED");
        Order savedOrder = orderRepository.save(order);
        emailNotificationService.sendPaymentConfirmed(savedOrder);
        return OrderResponse.from(savedOrder, objectMapper);
    }

    private Order find(String id) {
        return orderRepository.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Không tìm thấy đơn hàng"));
    }
}