import { Audio } from '../components/Audio';

type Props = {
  navigation: any;
};

const AudioScreen = ({navigation}: Props) => {
  
  
  return (
    <Audio navigation={navigation}/>
  );
};

export default AudioScreen;
