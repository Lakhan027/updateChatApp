import React from 'react'
import { useNavigate } from 'react-router-dom'

const HandleHome = () => {
  const navigate=useNavigate();
  const handleHome=()=>{
    navigate('/')
  }
  return (
    <button onClick={handleHome} className="border-2 px-4 py-2 mb-4 rounded-md bg-black text-customBlue font-semibold border-customBlue ">Home</button>
  )
}

export default HandleHome