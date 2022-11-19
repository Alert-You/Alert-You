import { Text, ScrollView } from 'react-native'
import React from 'react'
import { styles } from './style';

const ServiceAgreeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.contents}>
        본 알럿유 이용약관(이하 ‘본 약관’이라 함)은 알럿유(이하 ‘알럿유’이라
        함)가 본 서비스를 이용하는 고객(이하 ‘고객’이라 함)에게 제공하는 모든
        제품 및 서비스(이하 ‘본 알럿유’라 함)의 이용에 관한 조건에 대해
        정합니다.
      </Text>
      <Text style={styles.subTitle}>1. 정의</Text>
      <Text style={styles.contents}>
        본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
      </Text>
      <Text style={styles.contents}>
        1.1.‘콘텐츠’란 문장, 음성, 음악, 이미지, 동영상, 소프트웨어, 프로그램,
        코드 및 기타 정보를 말합니다.
      </Text>
      <Text style={styles.contents}>
        1.2.‘본 콘텐츠’란 본 서비스를 통해 접속할 수 있는 콘텐츠를 말합니다.
      </Text>
      <Text style={styles.contents}>
        1.3.‘투고 콘텐츠’란 고객이 본 서비스에 투고, 송신 또는 업로드한 콘텐츠를
        말합니다.
      </Text>
      <Text style={styles.contents}>
        1.4.‘이용 약관’이란 본 서비스에 ‘약관’, 가이드라인’, ‘정책’ 등의
        명칭으로 “알럿유”가 배포 또는 게시한 이용 약관을 말합니다.
      </Text>
      <Text style={styles.subTitle}>2. 약관 동의</Text>
      <Text style={styles.contents}>
        2.1고객은 본 약관에 따라 본 서비스를 이용해야 합니다. 고객은 본 약관에
        대해 동의를 했을 경우에 한하여 본 서비스를 이용할 수 있습니다.
      </Text>
      <Text style={styles.contents}>
        2.2.고객이 미성년자일 경우에는 친권자 등 법정대리인의 사전 동의를 얻은
        후 본 서비스를 이용하십시오. 또한 고객이 본 서비스를 사업자를 위해
        이용할 경우에는 당해 사업자 역시 본 약관에 동의한 후, 본 서비스를
        이용하십시오.
      </Text>
      <Text style={styles.contents}>
        2.3.본 서비스에 적용되는 개별 이용약관이 존재할 경우, 고객은 본 약관
        외에 개별 이용약관의 규정에 따라 본 서비스를 이용해야 합니다.
      </Text>
      <Text style={styles.subTitle}>3. 약관 변경</Text>
      <Text style={styles.contents}>
        “알럿유”가 필요하다고 판단할 경우, “알럿유”는 본 서비스 목적의 범위
        내에서 본 약관을 변경할 수 있습니다. 이때 “알럿유”는 본 약관의 변경본의
        내용과 변경의 효력일을 본 서비스 또는 “알럿유”의 웹사이트에 게시하거나,
        이를 “알럿유”가 정한 방법으로 고객에게 통지하여야 합니다.
      </Text>
      <Text style={styles.contents}>
        본 약관의 변경본은 그 효력일로부터 효력이 발생합니다.
      </Text>

      <Text style={styles.subTitle}>4. 계정</Text>

      <Text style={styles.contents}>
        4.1.본 서비스 이용을 위해 고객은 특정 정보를 등록하여 계정을 생성해야 할
        수 있습니다. 고객은 진실하고 정확하며 완전한 정보를 등록해야 하며 언제나
        최신 정보가 적용되도록 수정해야 합니다.
      </Text>
      <Text style={styles.contents}>
        4.2.고객이 본 서비스 이용을 위해 인증 정보를 등록할 경우, 이를 부정하게
        이용당하지 않도록 본인 책임 하에 엄중하게 관리해야 합니다. “알럿유”는
        등록된 인증 정보를 이용하여 이루어진 일체의 행위를 인증 정보를 등록한
        고객 본인의 행위로 간주할 수 있습니다.
      </Text>
      <Text style={styles.contents}>
        4.3.본 서비스에 등록한 고객은 언제라도 계정을 삭제하고 탈퇴할 수
        있습니다.
      </Text>
      <Text style={styles.contents}>
        4.4.“알럿유”는 마지막 접속 시점부터 １년 이상 경과한 계정을 해당 고객에
        대한 사전 통지 없이 삭제할 수 있습니다.
      </Text>
      <Text style={styles.contents}>
        4.5.고객이 본 서비스에서 가지는 모든 이용 권한은 이유를 막론하고 계정이
        삭제된 시점에 소멸됩니다. 고객의 실수로 계정을 삭제한 경우에도 계정을
        복구할 수 없음에 유의하시기 바랍니다.
      </Text>
      <Text style={styles.contents}>
        4.6.본 서비스의 계정은 고객에게 일신전속적으로 귀속됩니다. 고객이 본
        서비스에서 가지는 모든 이용권은 제삼자에게 양도, 대여 또는 처분할 수
        없으며, 제삼자에게 상속 또는 승계될 수 없습니다.
      </Text>
    </ScrollView>
  );
}

export default ServiceAgreeScreen