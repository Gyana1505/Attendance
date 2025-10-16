import axios from "axios"
import { server } from "../main"

export const register = async (data) => {

  const res = await axios.post(`${server}/auth/register`, data)
  return res.data
}

export const login = async (data) => {
  const res = await axios.post(`${server}/auth/login`, data)
  return res.data

}

export const giveattendance = async (type) => {
  const res = await axios.post(`${server}/attend/give`,{type},{
    headers: {
      token: localStorage.getItem("token")
    }
  })
  return res.data
}
export const getAttend=async()=>{
  const res=await axios.get(`${server}/attend/getAttend`,{
    headers: {
      token: localStorage.getItem("token")
    }
  })
  return res.data
}

export const getAllAtendend=async()=>{
  const res=await axios.get(`${server}/attend/getAll`,{
    headers: {
      token: localStorage.getItem("token")
    }
  })
  return res.data
}