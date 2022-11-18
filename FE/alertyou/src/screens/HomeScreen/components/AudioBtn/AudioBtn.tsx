import { innerGradientStyle, outerGradientStyle } from '@/theme/gradient';
import { MAIN } from '@/theme/colorVariants';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable } from 'react-native';
import { Circle } from 'native-base';
import { styles } from './style';

interface AudioBtnProps {
  props: {
    name: string;
    isShow: boolean;
    onPress: () => void;
  }
}

const AudioBtn = ({ props }: AudioBtnProps) => {
  const { onPress, name, isShow } = props;
  if (!isShow) return (<></>)
  return (
    <Pressable onPress={onPress} style={styles.btnContainer}>
      <Circle style={styles.btn} bg={outerGradientStyle}>
        <Circle size="85%" bg={innerGradientStyle}>
          <MaterialCommunityIcons name={name} color={MAIN.placeholder} size={40} />
        </Circle>
      </Circle>
    </Pressable>
  );
};

export default AudioBtn;
