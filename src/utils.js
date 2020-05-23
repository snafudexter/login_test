import React, {useState, useEffect} from 'react'

export const setError = (context, name, error, callback) => {
    context.setState({ [name]: { ...context.state[name], error } }, callback && callback);
}

export const onChange = (context, name, newValue, callback) => {
    context.setState({ [name]: { ...context.state[name], value: newValue } }, callback && callback);
}

export const validEmailRegex =
    RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export const validPasswordRegex = RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)

export const useWindowSize = () => {
    const isClient = typeof window === 'object';
  
    function getSize() {
      return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined
      };
    }
  
    const [windowSize, setWindowSize] = useState(getSize);
  
    useEffect(() => {
      if (!isClient) {
        return false;
      }
      
      function handleResize() {
        setWindowSize(getSize());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount
  
    return windowSize;
  }