package com.ssafy.alertyou.bodyguard.service;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.jwt.JwtProperties;
import com.ssafy.alertyou.account.jwt.JwtTokenProvider;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.bodyguard.dto.BodyGuardResDto;
import com.ssafy.alertyou.bodyguard.entity.Coguard;
import com.ssafy.alertyou.bodyguard.entity.Opguard;
import com.ssafy.alertyou.bodyguard.repository.CoGuardRepository;
import com.ssafy.alertyou.bodyguard.repository.OpGuardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BodyGuardServiceImpl implements BodyGuardService {
    private final OpGuardRepository opGuardRepository;
    private final CoGuardRepository coGuardRepository;
    private final UserRepository userRepository;

    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";

    public ResponseEntity<Map<String, Object>> getBodyGuard(long id) throws Exception {

        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();

        List<BodyGuardResDto> list = new ArrayList<>();

        User user = findUser(id); // 분기를 위한 User 찾기

        try{
            if (user.getRole().equals("학생")) {

                List<Opguard> guardlist = opGuardRepository.findAllByUser(user);

                for(Opguard opguard : guardlist){
                    list.add(new BodyGuardResDto(opguard.getOpGuard()));
                }
            }

            else if(user.getRole().equals("교사")) {

                List<Coguard> guardlist = coGuardRepository.findAllByUser(user);

                for(Coguard coguard : guardlist){
                    list.add(new BodyGuardResDto(coguard.getCoGuard()));
                }
            }

            result.put("msg",SUCCESS);
            result.put("bodyguards", list);
            status = HttpStatus.OK;

        } catch (Exception e){
            result.put("msg", FAIL);
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(result, status);
    }

    //보디가드 등록 및 해제
    public ResponseEntity<Map<String, Object>> addBodyGuard(String token, long id) throws Exception{

        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();

        User user = findUserByPhone(decodeToken(token));

        long enroll_id = user.getId();

        User userRole = findUser(enroll_id); // 분기를 위한 User 찾기
        User guard = findUser(id); // 저장할 가드 id

        Optional<Opguard> opguard = opGuardRepository.findByOpGuardAndUser(guard, userRole);
        Optional<Coguard> coguard = coGuardRepository.findByCoGuardAndUser(guard, userRole);
        try{
            // 학생이 등록하는 경우
            if (userRole.getRole().equals("학생")) {
                // 있는 경우 등록 해제
                if(opguard.isPresent()){
                    opGuardRepository.delete(opguard.get());
                }
                // 없는 경우 등록
                else{
                    Opguard newOpguard = Opguard.builder()
                            .opGuard(guard)
                            .user(userRole)
                            .build();
                    opGuardRepository.save(newOpguard);
                }
            }

            else if(userRole.getRole().equals("교사")) {
                if(coguard.isPresent()){
                    coGuardRepository.delete(coguard.get());
                }
                else{
                    Coguard newCoguard = Coguard.builder()
                            .coGuard(guard)
                            .user(userRole)
                            .build();
                    coGuardRepository.save(newCoguard);
                }

            }
            result.put("msg",SUCCESS);
            status = HttpStatus.OK;

        } catch (Exception e){
            result.put("msg", FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(result, status);
    }

    public User findUser(long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User Not Found"));
    }

    public User findUserByPhone(String phone){
        return userRepository.findByPhone(phone);
    }

    public String decodeToken(String token) throws Exception{
        JWTVerifier jwtVerifier = JwtTokenProvider.getVerifier(); // 토큰 검증을 실시
        DecodedJWT decodedJWT = jwtVerifier.verify(token.replace(JwtProperties.TOKEN_PREFIX, "")); // 토큰에서 Bearer 를 제거함
        return decodedJWT.getSubject(); // 디코딩한 JWT 토큰에서 핸드폰 번호를 가져옴
    }
}
