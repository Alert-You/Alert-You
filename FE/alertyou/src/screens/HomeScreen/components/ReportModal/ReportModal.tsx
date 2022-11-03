import React from 'react';
import {Button, FormControl, Input, Modal, TextArea} from 'native-base';
import Toast from 'react-native-toast-message';

interface PropsType {
  isShowReportModal: boolean;
  toggleIsShowReportModal: any;
}

const ReportModal = ({
  isShowReportModal,
  toggleIsShowReportModal,
}: PropsType) => {
  const nonEmergencyToastProps = {
    type: 'info',
    text1: '현장 목격 신고 완료',
    text2: '교사와 보디가드에게 목격 신고가 접수되었습니다!',
  };

  const successReport = () => {
    toggleIsShowReportModal();
    Toast.show(nonEmergencyToastProps);
  };

  return (
    <Modal isOpen={isShowReportModal} onClose={toggleIsShowReportModal}>
      <Modal.Content width="95%">
        {/* <Modal.CloseButton /> */}
        <Modal.Header>현장 목격 신고</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>상세 위치</FormControl.Label>
            <Input placeholder="욧골공원 남자화장실 옆" />
          </FormControl>
          <FormControl mt={5}>
            <FormControl.Label>신고 내용</FormControl.Label>
            <TextArea
              autoCompleteType={true}
              h={20}
              placeholder="고등학생 3명이 중학생을 때리고 있어요."
              w="100%"
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
              onPress={successReport}>
              신고
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ReportModal;
