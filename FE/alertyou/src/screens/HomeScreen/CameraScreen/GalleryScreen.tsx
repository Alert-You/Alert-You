import React from 'react';

import { Gallery } from '../components/Gallery';

type Props = {
  navigation: any;
};

const GalleryScreen = ({navigation}: Props) => {

  return (
    <Gallery navigation={navigation}/>
  );
};

export default GalleryScreen;
