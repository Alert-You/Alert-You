import { Spinner } from 'native-base'
import React from 'react'

import { MAIN } from '@/theme/colorVariants'

const CustomSpinner = () => {
  return (
    <>
    <Spinner color={MAIN.red} size="lg"/>
    </>
  )
}

export default CustomSpinner