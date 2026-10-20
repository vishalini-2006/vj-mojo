import { RegisterData, LoginData } from "../types/authTypes"

const API_LINK = import.meta.env.VITE_API_LINK;

const API = API_LINK;

export const registerUser = async (data: RegisterData) => {

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export const loginUser = async (data: LoginData) => {

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}