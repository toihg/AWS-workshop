package com.ecommerce.controller;

import com.ecommerce.dto.product.ProductResponse;
import com.ecommerce.dto.product.ProductRequest;
import com.ecommerce.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductResponse> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ProductResponse getProductById(@PathVariable UUID id) {
        return productService.getProductById(id);
    }

    @PostMapping(value = "/upload-image", consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE)
    public com.ecommerce.dto.product.ImageUploadResponse uploadImage(
            @RequestHeader(value = "X-Admin-Username", required = false) String admin,
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file
    ) {
        requireAdmin(admin);
        String s3Key = productService.uploadImage(file);
        String presignedUrl = productService.generatePresignedUrl(s3Key);
        return new com.ecommerce.dto.product.ImageUploadResponse(s3Key, presignedUrl);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse createProduct(
            @RequestHeader(value = "X-Admin-Username", required = false) String admin,
            @Valid @RequestBody ProductRequest request
    ) {
        requireAdmin(admin);
        return productService.createProduct(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(
            @PathVariable UUID id,
            @RequestHeader(value = "X-Admin-Username", required = false) String admin
    ) {
        requireAdmin(admin);
        productService.deleteProduct(id);
    }

    private void requireAdmin(String admin) {
        if (!"ADMIN".equals(admin)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Yêu cầu quyền admin");
        }
    }
}