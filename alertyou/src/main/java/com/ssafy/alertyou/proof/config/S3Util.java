package com.ssafy.alertyou.proof.config;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class S3Util {

//    private final AmazonS3Client amazonS3Client;
//    private final String ROOT = "C:/test/proof/";
//
//
//    @Value("${cloud.aws.s3.bucket}")
//    public String bucket;  // S3 버킷
//
//    // S3 파일 업로드
//    public String upload(MultipartFile multipartFile) throws IOException {
//        //저장 루트
//        String dirName = "image";
//        // MultipartFile -> File
//        File convertFile = convert(multipartFile)
//                .orElseThrow(() -> new IllegalArgumentException("file convert error")); // 파일을 변환할 수 없으면 에러
//
//        // S3에 저장할 파일명
//        String fileName = dirName + "/" + LocalDateTime.now().toString() + "_" + convertFile.getName();
//
//        // S3에 파일 업로드
//        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, convertFile).withCannedAcl(CannedAccessControlList.PublicRead));
//        String uploadImageUrl = amazonS3Client.getUrl(bucket, fileName).toString();
//
//        // 로컬 파일 삭제
//        convertFile.delete();
//
//        return uploadImageUrl;
//    }
//
//    // S3 파일 삭제
//    public void delete(String path) {
//        amazonS3Client.deleteObject(bucket, path);
//    }
//
//    // 파일 convert 후 로컬에 업로드
//    private Optional<File> convert(MultipartFile file) throws IOException {
//        File convertFile = new File(ROOT + file.getOriginalFilename());
//        if (convertFile.createNewFile()) { // 바로 위에서 지정한 경로에 File이 생성됨 (경로가 잘못되었다면 생성 불가능)
//            try (FileOutputStream fos = new FileOutputStream(convertFile)) { // FileOutputStream 데이터를 파일에 바이트 스트림으로 저장하기 위함
//                fos.write(file.getBytes());
//            }
//            return Optional.of(convertFile);
//        }
//        return Optional.empty();
//    }
private final AmazonS3Client amazonS3Client;
//
    @Value("${cloud.aws.s3.bucket}")
    public String bucket;  // S3 버킷

    // S3 파일 업로드
    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
//         MultipartFile -> File
        File convertFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("file convert error")); // 파일을 변환할 수 없으면 에러

//         S3에 저장할 파일명
        String fileName = dirName + "/" + LocalDateTime.now().toString() + "_" + convertFile.getName();

//         S3에 파일 업로드
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, convertFile).withCannedAcl(CannedAccessControlList.PublicRead));
        String uploadImageUrl = amazonS3Client.getUrl(bucket, fileName).toString();

//         로컬 파일 삭제
        convertFile.delete();

        return uploadImageUrl;
    }

    // S3 파일 삭제
    public void delete(String path) {
        amazonS3Client.deleteObject(bucket, path);
    }

    // 파일 convert 후 로컬에 업로드
    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(System.getProperty("user.dir") + "/" + file.getOriginalFilename());
        if (convertFile.createNewFile()) { // 바로 위에서 지정한 경로에 File이 생성됨 (경로가 잘못되었다면 생성 불가능)
            try (FileOutputStream fos = new FileOutputStream(convertFile)) { // FileOutputStream 데이터를 파일에 바이트 스트림으로 저장하기 위함
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }
}