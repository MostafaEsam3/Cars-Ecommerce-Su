import React, { useState } from 'react';

const WithComp = (OriginalComp)=>{
const NewComp = (props) => {
  const [Scroll , setScroll]=useState(true)
  const changeScroll = () => {
      setScroll((prev) => !prev);
  }
    return (
        <OriginalComp {...props} Scroll={Scroll} changeScroll={changeScroll}/>
    );
}
return NewComp; // Return the wrapped component
}
export default WithComp;
