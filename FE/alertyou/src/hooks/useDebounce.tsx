import React, {useEffect, useState} from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(value), delay || 500;
    });
    
    return () => {
      clearTimeout(timer);
    }
  }, [value, delay]);
  
  return debounce
};

export default useDebounce;
