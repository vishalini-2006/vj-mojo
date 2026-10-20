import { useState } from "react"
import { registerUser } from "../services/authService"
import { useNavigate } from "react-router-dom"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface RegisterForm {
  name: string
  email: string
  phone: string
  password: string
  gst_number?: string
}

const Register = () => {

  const navigate = useNavigate()

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    gst_number: ""
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    const res = await registerUser(form)

    alert(res.message)

    if (res.message === "Buyer registered successfully") {
      navigate("/login")
    }
  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-background">

      <Card className="w-[420px] shadow-lg">

        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Buyer Registration
          </CardTitle>
        </CardHeader>

        <CardContent>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                name="phone"
                placeholder="Enter phone number"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>GST Number (Optional)</Label>
              <Input
                name="gst_number"
                placeholder="Enter GST number"
                onChange={handleChange}
              />
            </div>

            <Button className="w-full">
              Register
            </Button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <span
                className="text-secondary cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>

          </form>

        </CardContent>

      </Card>

    </div>
  )
}

export default Register