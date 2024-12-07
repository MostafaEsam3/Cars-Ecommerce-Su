import React, { useContext } from 'react'
import { Context, product } from '../context/context'

export default function Card() {
    const exported_val = useContext(product)
  return (
    <>
    <p> {exported_val}</p>

    
    </>
  )
}
