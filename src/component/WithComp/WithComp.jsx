import React, { useCallback, useState } from 'react';

const withLoading = (WrappedComponent) => {
    return  (props)=>{
        const [loading, setLoading] = useState(9);

        // Pass loading state as a prop to the wrapped component
        const calc = useCallback((num) => {
          console.log("calc function executed");
          let result = num + 1;
          setLoading(result);
          return result;
        }, []); // Ensuring the f
        return (
        <WrappedComponent
          {...props} loading={loading} calc={calc}/> 
        );
    };
};

export default withLoading;
