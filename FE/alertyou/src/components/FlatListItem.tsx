
import React from 'react'
import { Box, Avatar, HStack, VStack, Text, Spacer } from "native-base";
import { WHITE, MAIN } from '@/theme/colorVariants';

const FlatListItem: React.FC<{ title: string; subTitle: string; bgColor: string; rightContent: React.ReactNode, uri: string }> = ({
  title,
  subTitle,
  bgColor,
  rightContent,
  uri }) => {

  let color: string = WHITE.white
  if (bgColor === WHITE.white) {
    color = MAIN.subFont
  }

  return (
    <Box pl={["0", "4"]} pr={["0", "5"]} py="13" backgroundColor={bgColor}>
      <HStack space={[3, 3]} justifyContent="space-between">
        <Avatar marginLeft={2} size="48px" source={{
          uri: uri
        }} />
        <VStack style={{ justifyContent: 'center' }}>
          <Text color={color} fontSize='15' bold>
            {title}
          </Text>
          <Text color={color} fontSize='12'>
            {subTitle}
          </Text>
        </VStack>
        <Spacer />
        <VStack style={{ justifyContent: 'center' }}>
          {rightContent && rightContent}
        </VStack>
      </HStack>
    </Box>
  )
}

export default FlatListItem