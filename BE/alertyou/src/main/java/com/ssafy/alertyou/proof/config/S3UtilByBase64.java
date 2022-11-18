package com.ssafy.alertyou.proof.config;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class S3UtilByBase64 {
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;  // S3 버킷

    // S3 파일 업로드
    public String upload(byte[] file, String endPoint, String dirName) throws IOException {
//      MultipartFile to File
        File convertFile = convert(file,endPoint)
                .orElseThrow(() -> new IllegalArgumentException("file convert error")); // 파일을 변환할 수 없으면 에러

//      S3에 저장할 파일명
        String fileName = dirName + "/"+ LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) +"_" + convertFile.getName();
//      S3에 파일 업로드
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, convertFile).withCannedAcl(CannedAccessControlList.PublicRead));
        String uploadImageUrl = amazonS3Client.getUrl(bucket, fileName).toString();

//      로컬 파일 삭제
        convertFile.delete();

        return uploadImageUrl;
    }

    // S3 파일 삭제
    public void delete(String path) {
        amazonS3Client.deleteObject(bucket, path);
    }

    // 파일 convert 후 로컬에 업로드
    // S3에 업로드 할 때, 로컬에 저장되어 있지 않으면 오류가 나기 때문에 일시적으로 로컬에 저장 후 업로드 -> 이후 로컬 파일 삭제 로직으로 진행
    private Optional<File> convert(byte[] file, String endPoint) throws IOException {
        File convertFile = new File(System.getProperty("user.dir") + "/" + UUID.randomUUID() + "." + endPoint);
        if (convertFile.createNewFile()) { // 바로 위에서 지정한 경로에 File이 생성됨 (경로가 잘못되었다면 생성 불가능)
            try (FileOutputStream fos = new FileOutputStream(convertFile)) { // FileOutputStream 데이터를 파일에 바이트 스트림으로 저장하기 위함
                fos.write(file);
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

    public ResponseEntity<byte[]> download(String key, String endPoint) throws IOException{

        // S3 서버로 요청 단계
        S3Object s3Object = amazonS3Client.getObject(new GetObjectRequest(bucket, key));
        S3ObjectInputStream objectInputStream = s3Object.getObjectContent();
        System.out.println(objectInputStream.toString());
        byte[] bytes = IOUtils.toByteArray(objectInputStream);

        // 다운로드 로직
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.valueOf(endPoint));
        httpHeaders.setContentLength(bytes.length);
        String[] arr = key.split("_");
        String type = arr[arr.length-1];
        String fileName = URLEncoder.encode(type, "UTF-8").replaceAll("\\+", "%20");
        httpHeaders.setContentDispositionFormData("attachment",fileName); // 파일 이름 저장
        return new ResponseEntity<>(bytes,httpHeaders, HttpStatus.OK);
    }
}