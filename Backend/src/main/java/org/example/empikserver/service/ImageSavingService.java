package org.example.empikserver.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageSavingService {

    @Value("${empik.app.product_images.path}")
    private String imageUploadPath;

    public String saveImageToFileSystem(MultipartFile image) throws IOException {
        if (image == null || image.isEmpty()) {
            throw new IOException("Invalid file upload.");
        }

        Path currentDir = Paths.get("");/*.toAbsolutePath();*/ //System.out.println(currentDir);
        Path uploadDir = currentDir.resolve(imageUploadPath); System.out.println(uploadDir);

        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        String filename = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path filePath = uploadDir.resolve(filename);


        Files.copy(image.getInputStream(), filePath);

        return filePath.toString().replace("Frontend\\EmpikApp\\", "");
    }
}

