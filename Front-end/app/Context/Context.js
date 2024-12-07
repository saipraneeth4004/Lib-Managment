"use client"
import React, { createContext, useState } from 'react'

export const CentralizedData = createContext(null);

const CentralData = (props) => {
  const [auth, setAuth] = useState(false)
  const [admin,setAdmin] = useState(false)
  
  return (
    <CentralizedData.Provider value={[auth, setAuth,admin,setAdmin]} >
      {props.children}
    </CentralizedData.Provider>
  )
}

export default CentralData