import { FlatList, Text, View } from 'native-base'
import React, { useCallback } from 'react'

import { proofType } from '@/types'

import ProofItem from './ProofItem'

const ProofList: React.FC<{ proofs: proofType[] | undefined }> = ({ proofs }) => {
  const renderItem = useCallback(({ item }: { item: proofType }) => {
    return <ProofItem item={item} />;
  }, []);

  return (
    <View>
      {proofs?.length === 0 ? <Text>사진 및 녹취 자료가 없습니다.</Text> :
        <FlatList
          data={proofs}
          renderItem={renderItem}
        />
      }
    </View>
  )
}

export default ProofList