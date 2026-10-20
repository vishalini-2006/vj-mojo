import { useState } from "react"
import { loginUser } from "../services/authService"
import { LoginData } from "../types/authTypes"
import { saveToken } from "../utils/auth"
import { useNavigate } from "react-router-dom"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const Login = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState<LoginData>({
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const res = await loginUser(form)

  if (res.token) {
    saveToken(res.token)

    // ✅ ADD THIS
    localStorage.setItem("user", JSON.stringify(res.user))

    navigate("/")
  } else {
    alert(res.message)
  }
}

  return (

    <div className="flex items-center justify-center min-h-screen bg-background">

      <Card className="w-[380px] shadow-lg">

        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Buyer Login
          </CardTitle>
        </CardHeader>

        <CardContent>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>

            <Button className="w-full">
              Login
            </Button>

            <p className="text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <span
                className="text-secondary cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>

          </form>

        </CardContent>

      </Card>

    </div>
  )
}

export default Login