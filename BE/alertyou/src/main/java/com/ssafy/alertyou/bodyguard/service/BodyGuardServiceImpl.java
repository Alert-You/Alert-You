package com.ssafy.alertyou.bodyguard.service;


import com.ssafy.alertyou.account.entity.User;
import com.ssafy.alertyou.bodyguard.dto.BodyGuardResDto;
import com.ssafy.alertyou.bodyguard.entity.Coguard;
import com.ssafy.alertyou.bodyguard.entity.Opguard;
import com.ssafy.alertyou.bodyguard.repository.CoGuardRepository;
import com.ssafy.alertyou.bodyguard.repository.OpGuardRepository;
import com.ssafy.alertyou.util.Util;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import static com.ssafy.alertyou.util.Util.decodeToken;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BodyGuardServiceImpl implements BodyGuardService {
    private final OpGuardRepository opGuardRepository;
    private final CoGuardRepository coGuardRepository;
    private final Util util;

    public List<BodyGuardResDto> getBodyGuard(long id) throws Exception {

        List<BodyGuardResDto> list = new ArrayList<>();

        User user = util.findUser(id); // 분기를 위한 User 찾기

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
            return list;

        } catch (Exception e){
            return null;
        }
    }

    //보디가드 등록 및 해제
    public Long addBodyGuard(String token, long id) throws Exception{
        User user = util.findUserByPhone(decodeToken(token));
        User guard = util.findUser(id); // 저장할 가드 id
        Optional<Opguard> opguard = opGuardRepository.findByOpGuardAndUser(guard, user);
        Optional<Coguard> coguard = coGuardRepository.findByCoGuardAndUser(guard, user);
        try{
            if(user.getRole().equals("교사")) {
                if(coguard.isPresent()){
                    coGuardRepository.delete(coguard.get());
                }
                else{
                    Coguard newCoguard = Coguard.builder()
                            .coGuard(guard)
                            .user(user)
                            .build();
                    coGuardRepository.save(newCoguard);
                }

            }
            // 학생이 등록하는 경우
            else if (user.getRole().equals("학생")) {
                // 있는 경우 등록 해제
                if(opguard.isPresent()){
                    opGuardRepository.delete(opguard.get());
                }
                // 없는 경우 등록
                else{
                    Opguard newOpguard = Opguard.builder()
                            .opGuard(guard)
                            .user(user)
                            .build();
                    opGuardRepository.save(newOpguard);
                }
            }
            return id;

        } catch (Exception e){
            return null;
        }

    }

}
