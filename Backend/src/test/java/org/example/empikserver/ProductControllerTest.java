package org.example.empikserver;

import org.example.empikserver.controller.ProductController;
import org.example.empikserver.model.Product;
import org.example.empikserver.payload.request.ProductRequest;
import org.example.empikserver.repository.ProductRepository;
import org.example.empikserver.service.ImageSavingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductControllerTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ImageSavingService imageSavingService;

    @InjectMocks
    private ProductController productController;

    private Product product1;
    private Product product2;
    private ProductRequest productRequest;

    @BeforeEach
    public void setUp() {
        product1 = new Product();
        product1.setId(1L);
        product1.setName("Product 1");
        product1.setPrice(new BigDecimal("100.0"));
        product1.setProducer("Producer 1");
        product1.setDescription("Description 1");
        product1.setRecommendedAge(10);
        product1.setRecommendedSex("Male");
        product1.setMaterial("Material 1");
        product1.setHeightInMilimeters(100);
        product1.setWidthInMilimeters(100);
        product1.setDepthInMilimeters(100);
        product1.setWeightInGrams(1000);

        product2 = new Product();
        product2.setId(2L);
        product2.setName("Product 2");
        product2.setPrice(new BigDecimal("200.0"));
        product2.setProducer("Producer 2");
        product2.setDescription("Description 2");
        product2.setRecommendedAge(12);
        product2.setRecommendedSex("Female");
        product2.setMaterial("Material 2");
        product2.setHeightInMilimeters(200);
        product2.setWidthInMilimeters(200);
        product2.setDepthInMilimeters(200);
        product2.setWeightInGrams(2000);

        productRequest = new ProductRequest();
        productRequest.setName("Product 1");
        productRequest.setPrice(new BigDecimal("100.0"));
        productRequest.setProducer("Producer 1");
        productRequest.setDescription("Description 1");
        productRequest.setRecommendedAge(10);
        productRequest.setRecommendedSex("Male");
        productRequest.setMaterial("Material 1");
        productRequest.setHeightInMilimeters(100);
        productRequest.setWidthInMilimeters(100);
        productRequest.setDepthInMilimeters(100);
        productRequest.setWeightInGrams(1000);

        MockMultipartFile mockImage = new MockMultipartFile("image", "image.jpg", "image/jpeg", new byte[]{});
        productRequest.setImage(mockImage);
    }

    @Test
    public void testGetAllProducts() {
        when(productRepository.findAll()).thenReturn(Arrays.asList(product1, product2));

        ResponseEntity<List<Product>> response = productController.getAllProducts(null);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        verify(productRepository, times(1)).findAll();
    }

    @Test
    public void testGetProductById() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product1));

        ResponseEntity<Product> response = productController.getProductById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(product1.getName(), response.getBody().getName());
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    public void testCreateProduct() throws IOException {
        when(productRepository.save(any(Product.class))).thenReturn(product1);
        when(imageSavingService.saveImageToFileSystem(any(MultipartFile.class))).thenReturn("path/to/image");

        ResponseEntity<Product> response = productController.createProduct(productRequest);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(product1.getName(), response.getBody().getName());
        verify(productRepository, times(1)).save(any(Product.class));
        verify(imageSavingService, times(1)).saveImageToFileSystem(any(MultipartFile.class));
    }

    @Test
    public void testUpdateProduct() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product1));
        when(productRepository.save(any(Product.class))).thenReturn(product1);

        ResponseEntity<Product> response = productController.updateProduct(1L, product2);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(product2.getName(), response.getBody().getName());
        verify(productRepository, times(1)).findById(1L);
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    public void testDeleteProduct() {
        doNothing().when(productRepository).deleteById(1L);

        ResponseEntity<HttpStatus> response = productController.deleteProduct(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(productRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testDeleteAllProducts() {
        doNothing().when(productRepository).deleteAll();

        ResponseEntity<HttpStatus> response = productController.deleteAllProducts();

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(productRepository, times(1)).deleteAll();
    }
}

