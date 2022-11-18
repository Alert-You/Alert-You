
import React from 'react'
import { Box, HStack, VStack, Text, Spacer, Circle } from "native-base";
import { WHITE, MAIN } from '@/theme/colorVariants';

const FlatListItem: React.FC<{ title: string; subTitle: string; bgColor: string; rightContent: React.ReactNode, icon: React.ReactNode, bdbColor: string, bdWidth: number, bdColor: string, cbgColor: string }> = ({
  title,
  subTitle,
  bgColor,
  rightContent,
  bdbColor,
  bdWidth,
  bdColor,
  cbgColor,
  icon
}) => {

  let color: string = WHITE.white
  if (bgColor === WHITE.white) {
    color = MAIN.subFont
  }

  return (
    <Box pl={["0", "4"]} pr={["0", "5"]} py="13" backgroundColor={bgColor} borderBottomColor={bdbColor} borderBottomWidth={bdWidth}>
      <HStack space={[3, 3]} justifyContent="space-between">
        <Circle size="45px" borderColor={bdColor} borderWidth="1" marginLeft={4} background={cbgColor}>
          {icon}
        </Circle>
        <VStack style={{ justifyContent: 'center' }}>
          <Text color={color} fontSize='15' bold>
            {title}
          </Text>
          <Text color={color} fontSize='12'>
            {subTitle}
          </Text>
        </VStack>
        <Spacer />
        <VStack style={{ justifyContent: 'center', marginRight: 16 }}>
          {rightContent && rightContent}
        </VStack>
      </HStack>
    </Box>
  )
}

export default FlatListItem