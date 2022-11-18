import { Center, FlatList, Image, View } from 'native-base'
import React, { useCallback } from 'react'

import { proofType } from '@/types'
import noProof from '@assets/noproof.png'

import ProofItem from './ProofItem'
import { Dimensions } from 'react-native'

const ProofList: React.FC<{ proofs: proofType[] | undefined }> = ({ proofs }) => {
  const renderItem = useCallback(({ item }: { item: proofType }) => {
    return <ProofItem item={item} />;
  }, []);

  return (
    <View>
      {proofs?.length === 0 ?
        <Center>
          <Image
            source={noProof}
            alt="noProof"
            style={{ width: Dimensions.get('window').width - 250, height: Dimensions.get('window').height - 500 }} />
        </Center> :
        <FlatList
          data={proofs}
          renderItem={renderItem}
          keyExtractor={item => item.url}
        />
      }
    </View>
  )
}

export default ProofList