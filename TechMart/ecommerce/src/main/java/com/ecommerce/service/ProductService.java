package com.ecommerce.service;

import com.ecommerce.dto.product.ProductResponse;
import com.ecommerce.dto.product.ProductRequest;
import com.ecommerce.entity.Product;
import com.ecommerce.repository.ProductRepository;

import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
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

    public ProductResponse createProduct(ProductRequest request) {
        if (productRepository.existsBySlug(request.slug())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Slug sản phẩm đã tồn tại");
        }

        Product product = new Product();
        product.setSlug(request.slug());
        product.setName(request.name());
        product.setBrand(request.brand());
        product.setCategory(request.category());
        product.setPrice(request.price());
        product.setImage(request.image());
        product.setDescription(request.description());
        product.setStock(request.stock());
        product.setRating(request.rating() == null ? BigDecimal.ZERO : request.rating());

        return toResponse(productRepository.save(product));
    }

    public String uploadImage(org.springframework.web.multipart.MultipartFile file) {
        return s3Service.uploadProductImage(file);
    }

    public String generatePresignedUrl(String s3Key) {
        return s3Service.generatePresignedUrl(s3Key);
    }

    public void deleteProduct(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy sản phẩm"));
        productRepository.delete(product);
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