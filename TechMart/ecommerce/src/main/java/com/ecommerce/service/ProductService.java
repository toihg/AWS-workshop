package com.ecommerce.service;

import com.ecommerce.dto.product.ProductResponse;
import com.ecommerce.entity.Product;
import com.ecommerce.repository.ProductRepository;

import com.ecommerce.service.S3Service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final S3Service s3Service;

    public ProductService(
            ProductRepository productRepository,
            S3Service s3Service) {
        this.productRepository = productRepository;
        this.s3Service = s3Service;
    }

    public List<ProductResponse> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ProductResponse getProductById(UUID id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found: " + id));

        return toResponse(product);
    }

    private ProductResponse toResponse(Product product) {

        String imageUrl = s3Service.generatePresignedUrl(
                product.getImage());

        return new ProductResponse(
                product.getId(),
                product.getSlug(),
                product.getName(),
                product.getBrand(),
                product.getCategory(),
                product.getPrice(),
                imageUrl,
                product.getDescription(),
                product.getStock(),
                product.getRating());
    }
}