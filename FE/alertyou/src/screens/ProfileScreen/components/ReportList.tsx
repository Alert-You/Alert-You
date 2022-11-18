import { Center, FlatList, Image, View } from 'native-base'
import React, { useCallback } from 'react'

import { repType } from '@/types'
import noReport from '@assets/noreport.png'

import ReportItem from './ReportItem'
import { Dimensions } from 'react-native'

const ReportList: React.FC<{ reports: repType[] | undefined }> = ({ reports }) => {
  const renderItem = useCallback(({ item }: { item: repType }) => {
    return <ReportItem item={item} />;
  }, []);

  return (
    <View>
      {reports?.length === 0 ?
        <Center>
          <Image
            source={noReport}
            alt="noReport"
            style={{ width: Dimensions.get('window').width - 250, height: Dimensions.get('window').height - 500 }} />
        </Center> :
        <FlatList
          data={reports}
          renderItem={renderItem}
          keyExtractor={item => item.reportId + ''}
        />
      }
    </View>
  )
}

export default ReportList