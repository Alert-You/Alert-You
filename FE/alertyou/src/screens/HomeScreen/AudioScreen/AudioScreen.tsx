import {Audio} from '../components/Audio';
import {isEmergencyState} from '@/store/isEmergencyState';
import {useRecoilValue} from 'recoil';

type Props = {
  navigation: any;
};

const AudioScreen = ({navigation}: Props) => {
  const isEmergency = useRecoilValue(isEmergencyState);
  console.log('isEmergency: ', isEmergency);

  return <Audio navigation={navigation} isEmergency={isEmergency} />;
};

export default AudioScreen;
