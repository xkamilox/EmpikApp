package org.example.empikserver.controller;

import org.example.empikserver.model.Product;
import org.example.empikserver.payload.request.ProductRequest;
import org.example.empikserver.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts(@RequestParam(required=false) String name) {
        try{
            List<Product> products = new ArrayList<>();

            if(name==null){
                products.addAll(productRepository.findAll());
            }
            else{
                products.addAll(productRepository.findByNameContaining(name));
            }

            if(products.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch( Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") long id) {

            Optional<Product> product = productRepository.findById(id);

            if(product.isPresent()) {
                return new ResponseEntity<>(product.get(),HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
    }


    @PostMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> createProduct(@ModelAttribute ProductRequest product) {
        try{

            //byte[] imageData = product.getImage().getBytes();



            Product prod = productRepository
                    .save(new Product(product, false/*, imageData*/));
            return new ResponseEntity<>(prod, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") long id,
             @RequestBody Product product) {

        Optional<Product> prod = productRepository.findById(id);

        if(prod.isPresent()){
            Product updatedProduct = prod.get();
            updatedProduct.setName(product.getName());
            updatedProduct.setPrice(product.getPrice());
            updatedProduct.setProducer(product.getProducer());
            updatedProduct.setDescription(product.getDescription());
            updatedProduct.setRecommendedAge(product.getRecommendedAge());
            updatedProduct.setRecommendedSex(product.getRecommendedSex());
            updatedProduct.setMaterial(product.getMaterial());
            updatedProduct.setHeightInMilimeters(product.getHeightInMilimeters());
            updatedProduct.setWidthInMilimeters(product.getWidthInMilimeters());
            updatedProduct.setDepthInMilimeters(product.getDepthInMilimeters());
            updatedProduct.setWeightInGrams(product.getWeightInGrams());
            updatedProduct.setAvailable(product.isAvailable());

            return new ResponseEntity<>(productRepository.save(updatedProduct), HttpStatus.OK);

        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("id") long id) {
        try{
            productRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteAllProducts() {
        try {
            productRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}
