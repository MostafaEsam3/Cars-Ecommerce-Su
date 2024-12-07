import React, { createContext } from 'react'
export const product = createContext() 
 export function Context({children}) {
    const value = "mostafa and context"
  return (
   <>

   <product.Provider value={value}>
   {children}
   </product.Provider>
   
   
   </>
  )
}
