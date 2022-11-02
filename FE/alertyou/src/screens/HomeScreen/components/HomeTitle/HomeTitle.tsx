import { Center } from 'native-base';

interface contentType {
  content: string
}

const HomeTitle = ({content}:contentType) => {
  const titleStyle = {
    fontSize: '30',
    fontWeight: 'bold',
    color: 'white',
  }
  return (
    <>
      <Center
        _text={titleStyle}
      >
        {content}
      </Center>
    </>
  );
};

export default HomeTitle;