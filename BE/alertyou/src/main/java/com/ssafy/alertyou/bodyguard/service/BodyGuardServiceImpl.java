package com.ssafy.alertyou.bodyguard.service;

import com.ssafy.alertyou.account.entity.User;
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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

        if (user.getRole().equals("student")) {

            List<Opguard> guardlist = opGuardRepository.findAllByUser(user);

            for(Opguard opguard : guardlist){
                list.add(new BodyGuardResDto(opguard.getOpGuard()));
            }
        }

        else if(user.getRole().equals("teacher")) {

            List<Coguard> guardlist = coGuardRepository.findAllByUser(user);

            for(Coguard coguard : guardlist){
                list.add(new BodyGuardResDto(coguard.getCoGuard()));
            }
        }


        if (!list.isEmpty()){
            result.put("msg",SUCCESS);
            result.put("bodyguards", list);
            status = HttpStatus.OK;
        } else if(list.isEmpty()){
            result.put("msg",FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(result, status);
    }

    public User findUser(long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User Not Found"));
    }
}
