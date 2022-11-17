import { View, Text, ScrollView } from 'react-native'
import React from 'react'

import { styles } from './style'

type Props = {}

const PrivacyScreen = (props: Props) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>알럿유 개인정보 처리 방침</Text>
      <Text style={styles.contents}>
        “알럿유”(이하 “알럿유”는)은 회원님(이하 "이용자")의 개인정보를
        중요시하며, '정보통신망 이용촉진 및 정보보호에 관한 법률',
        '개인정보보호법' 등을 준수하고 있습니다. “알럿유”은 개인정보취급방침을
        통하여 "이용자"님께서 제공하시는 개인정보가 어떠한 용도와 방식으로
        이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지
        알려드립니다.
      </Text>
      <Text style={styles.subTitle}>1. 개인정보의 수집 및 이용목적</Text>
      <Text style={styles.contents}>
        “알럿유”은 수집한 개인정보를 다음의 목적을 위해 활용합니다. 이용 목적이
        변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등
        필요한 조치를 이행할 예정입니다.
      </Text>
      <Text style={styles.listContents}>{`\u2022`}회원 가입 및 관리</Text>
      <Text style={styles.smallListContents}>
        {`\u00B0`} : 회원제 서비스 이용에 따른 본인확인, 개인 식별,
        불량"이용자"의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 가입
        및 가입횟수 제한, 회원 제재, 고객 문의에 대한 회신, 분쟁 조정을 위한
        기록 보존, 민원처리, 고지사항 전달
      </Text>
      <Text style={styles.listContents}>
        {`\u2022`}법령 및 약관 등의 이행 및 준수
      </Text>
      <Text style={styles.smallListContents}>
        {`\u00B0`} : 법령 혹은 이용약관 등에 반하여 피해를 줄 수 있는 부분을
        방지
      </Text>
      <Text style={styles.subTitle}>2. 수집하는 개인정보 항목 및 수집방법</Text>
      <Text style={styles.listContents}>
        {`\u2022`}수집하는 개인정보의 항목
      </Text>
      <Text style={styles.smallListContents}>
        {`\u00B0`} : 법령 혹은 이용약관 등에 반하여 피해를 줄 수 있는 부분을
        방지
      </Text>

      <Text style={styles.listContents}>
        {`\u2022`}회원가입 및 상담, 서비스 제공을 위해 아래와 같은 개인정보를
        수집하고 있습니다.
      </Text>
      <Text style={styles.smallListContents}>
        {`\u00B0`}필수항목 : 성명, 전화번호, 비밀번호, 학교 정보
      </Text>
      <Text style={styles.listContents}>
        {`\u2022`} 부가서비스 또는 이벤트 응모 과정에서 해당 서비스의 "이용자"에
        한해서 몇 가지 정보들이 수집 될 수 있으며, 이러한 정보 수집 시 별도의
        수집항목에 대한 동의를 받은 후 수집합니다. -
      </Text>
      <Text style={styles.listContents}>
        {`\u2022`}서비스 이용 과정이나 사업 처리 과정에서 서비스이용기록,
        접속로그, 쿠키, 접속 IP, 결제 기록, 불량이용 기록이 생성되어 수집될 수
        있습니다.
      </Text>
      <Text style={styles.listContents}>{`\u2022`}수집방법</Text>
      <Text style={styles.smallListContents}>
        {`\u00B0`}“알럿유”은 다음과 같은 방법으로 개인정보를 수집합니다.
      </Text>
      <Text style={styles.smallListContents}>
        {`\u00B0`}회원 가입이나 사용 중 "이용자"의 자발적 제공을 통한 수집
      </Text>
      <Text style={styles.listContents}>
        {`\u2022`}정보주체의 수집이용 거부권 및 불이익 고지
      </Text>
      <Text style={styles.smallListContents}>
        {`\u00B0`}정보주체는 “알럿유”가 수집하는 개인정보의 항목 및 수집 방법에
        동의를 거부할 수 없으며, 거부 시 "이용자"에게 제공되는 서비스 이용이
        제한될 수 있습니다.
      </Text>
      <Text style={styles.subTitle}>3. 수집한 개인정보의 위탁</Text>
      <Text style={styles.listContents}>
        {`\u2022`}“알럿유”은 "이용자"의 동의 없이 개인정보 처리를 외부 업체에
        제공하지 않습니다.
      </Text>
      <Text style={styles.subTitle}>4. 개인정보의 보유 및 이용기간</Text>
      <Text style={styles.listContents}>
        {`\u2022`}“알럿유”이 개인정보를 수집하는 경우 보유기간은 동의에 의한
        회원가입 후 회원탈퇴 시까지입니다. 또한 회원탈퇴시 해당 정보를 지체 없이
        파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안
        보존합니다.
      </Text>
      <Text style={styles.smallListContents}>
        {`\u00B0`}“알럿유” 내부 방침에 의한 정보보호 사유 - 보존 기간 : 1년
      </Text>
      <Text style={styles.subTitle}>5. 개인정보의 파기절차</Text>
      <Text style={styles.listContents}>
        {`\u2022`}“알럿유”은 원칙적으로 개인정보 수집 및 이용목적이 달성된
        후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과
        같습니다.
      </Text>
      <Text style={styles.listContents}>{`\u2022`}파기절차</Text>
      <Text style={styles.smallListContents}>
        {`\u00B0`} 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후 내부 방침
        및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조)
        일정 기간 저장된 후 파기됩니다.
      </Text>
      <Text style={styles.subTitle}>6. 개인정보의 안전성 확보조치 및 대책</Text>
      <Text style={styles.listContents}>
        {`\u2022`}“알럿유”는 「개인정보보호법」 제29조에 따라 "이용자"들의
        개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지
        않도록 다음과 같이 안전성 확보에 필요한 기술적, 관리적 조치를 하고
        있습니다.
      </Text>
      <Text style={styles.listContents}>{`\u2022`}기술적 대책</Text>
      <Text style={styles.smallListContents}>
        {`\u00B0`}서비스 회원 아이디(ID)의 비밀번호는 암호화되어 저장 및
        관리되고 있어 본인만이 알고 있으며, 개인정보의 확인 및 변경도 비밀번호를
        알고 있는 본인에 의해서만 가능합니다.
      </Text>
      <Text style={styles.smallListContents}>
        {`\u00B0`}“알럿유”는 해킹이나 컴퓨터 바이러스 등에 의해 "이용자"의
        개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다합니다.
      </Text>
      <Text style={styles.smallListContents}>
        {`\u00B0`}개인정보의 훼손에 대비해서 암호화 통신 등을 통하여 네트워크
        상에서 개인정보를 안전하게 전송할 수 있도록 합니다.
      </Text>
      <Text style={styles.listContents}>
        {`\u2022`}단, "이용자" 본인의 부주의나 인터넷상의 문제로 ID, 비밀번호,
        주민등록번호 등 개인정보가 유출되어 발생한 문제에 대해 “알럿유”은 일체의
        책임을 지지 않습니다.
      </Text>
    </ScrollView>
  );
}

export default PrivacyScreen