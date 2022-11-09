import { FlatList, Text, View } from 'native-base'
import React, { useCallback } from 'react'

import { repType } from '@/types'

import ReportItem from './ReportItem'

const ReportList: React.FC<{ reports: repType[] | undefined }> = ({ reports }) => {
  const renderItem = useCallback(({ item }: { item: repType }) => {
    return <ReportItem item={item} />;
  }, []);

  return (
    <View>
      {reports?.length === 0 ? <Text>신고 내역이 없습니다.</Text> :
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