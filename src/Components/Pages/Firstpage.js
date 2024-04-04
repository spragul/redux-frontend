import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Firstpage() {
  const token=sessionStorage.getItem("token")
  const navigate =useNavigate();
  useEffect(()=>{
    if(token){
      navigate('/dashboard')
    }else{
      navigate('/login')
    }
  },[])
  return (
    <div>Firstpage</div>
  )
}

export default Firstpage