package com.ssafy.alertyou.guard.service;

import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.account.repository.UserRepository;
import com.ssafy.alertyou.guard.dto.OpGuardResDto;
import com.ssafy.alertyou.guard.entity.Opguard;
import com.ssafy.alertyou.guard.repository.OpGuardRepository;
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
public class OpGuardServiceImpl implements OpGuardService {
    private final OpGuardRepository opGuardRepository;
    private final UserRepository userRepository;

    private final String SUCCESS = "SUCCESS";
    private final String FAIL = "FAIL";

    public ResponseEntity<Map<String, Object>> getOpGuard(long id) throws Exception {
        List<Opguard> guardlist = opGuardRepository.findAllByUser(findUser(id));

        HttpStatus status = null;
        Map<String, Object> result = new HashMap<>();

        List<OpGuardResDto> list = new ArrayList<>();

        for(Opguard opguard : guardlist){
            list.add(new OpGuardResDto(opguard.getOpGuard()));
        }

        if (!list.isEmpty()){
            result.put("msg",SUCCESS);
            result.put("opguards", list);
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
