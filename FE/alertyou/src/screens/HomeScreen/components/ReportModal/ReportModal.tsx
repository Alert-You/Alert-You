import React, { useReducer } from 'react';
import {Button, FormControl, Input, Modal, TextArea} from 'native-base';
import Toast from 'react-native-toast-message';
import { reportModalInitialState, reportModalReducer } from './functions';
import {useCurrentLocation} from '@/hooks/useCurrentLocation';
import { reportWitness } from '@/screens/HomeScreen/api';
import { errorToastProps, lostLocationToastProps, nonEmergencyToastProps } from '@/constants/toastProps';

interface PropsType {
  isShowReportModal: boolean;
  toggleIsShowReportModal: any;
}

const ReportModal = ({
  isShowReportModal,
  toggleIsShowReportModal,
}: PropsType) => {
  

  const {location} = useCurrentLocation();
  const onClickReport = async () => {
    if (location) {
      const data = {...location, ...state}
      const response = await reportWitness(data)
      if (response.msg === 'SUCCESS') {
        Toast.show(nonEmergencyToastProps);
      } else {
        Toast.show(errorToastProps);
      }
    } else {
      Toast.show(lostLocationToastProps);
    }
    toggleIsShowReportModal();
    
  };

  const [state, dispatch] = useReducer(reportModalReducer, reportModalInitialState);

  const changeReportPlace = (e: string): void => {
    dispatch({type: 'place', payload: e});
  };

  const changeReportContent = (e: string): void => {
    dispatch({type: 'content', payload: e});
  };

  return (
    <Modal isOpen={isShowReportModal} onClose={toggleIsShowReportModal}>
      <Modal.Content width="95%">
        <Modal.Header>현장 목격 신고</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>상세 위치</FormControl.Label>
            <Input placeholder="욧골공원 남자화장실 옆" value={state.place} onChangeText={changeReportPlace} />
          </FormControl>
          <FormControl mt={5}>
            <FormControl.Label>신고 내용</FormControl.Label>
            <TextArea
              autoCompleteType={true}
              h={20}
              placeholder="고등학생 3명이 중학생을 때리고 있어요."
              w="100%"
              value={state.content} onChangeText={changeReportContent}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={1}>
            <Button
              variant="unstyled"
              _text={{color: 'gray.500'}}
              onPress={toggleIsShowReportModal}>
              취소
            </Button>
            <Button
              variant="unstyled"
              _text={{color: 'blue.500', fontWeight: 'black'}}
              onPress={onClickReport}>
              신고
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ReportModal;

