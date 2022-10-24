package com.ssafy.alertyou.proof.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class proofServiceImpl implements proofService {
    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final String IMAGE = "image/";
    private final String RECORD = "record/";

    public String addProof(MultipartFile mpart) throws Exception{
//        return "hello";
//        File orgFile =
        // MultipartFile to File
        System.out.println("여긴가 1");
        File file = new File(LocalDateTime.now().toString());
        System.out.println("여긴가 2");
        file.createNewFile();
        System.out.println("여긴가 3");
        FileOutputStream outputStream = new FileOutputStream(file);
        System.out.println("여긴가 4");
        outputStream.write(mpart.getBytes());
        System.out.println("여긴가 5");

        outputStream.close();
        System.out.println("여긴가 6");

        // S3에 저장할 파일명
        String fileName = "IMAGE" + "/" + file.getName();
        System.out.println("여긴가 7");

        // S3에 파일 업로드
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, file)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        System.out.println("여긴가 8");

        String uploadImageUrl = amazonS3Client.getUrl(bucket, fileName).toString();
        System.out.println("여긴가 9");
        return uploadImageUrl;
    }

}
