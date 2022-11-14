export const errorToastProps = {
  type: 'error',
  text1: '문제 발생',
  text2: '문제가 발생하여 접수되지 않았습니다. 다시 시도해주세요.',
};

export const lostLocationToastProps = {
  type: 'error',
  text1: '위치 정보 부재',
  text2: '위치 정보 로딩에 실패하여 접수되지 않았습니다.',
};

export const emergencyToastProps = {
  type: 'error',
  text1: '도움 요청 완료',
  text2: '교사와 보디가드에게 도움 요청이 완료되었습니다!',
};

export const nonEmergencyToastProps = {
  type: 'info',
  text1: '현장 목격 신고 완료',
  text2: '교사와 보디가드에게 목격 신고가 접수되었습니다!',
};