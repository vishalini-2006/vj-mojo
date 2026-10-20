export interface RegisterData {
  name: string
  email: string
  phone: string
  password: string
  user_type: "wholesale" | "retailer"
}

export interface LoginData {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  token?: string
}