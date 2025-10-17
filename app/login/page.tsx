'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" })
  const router = useRouter()

  const handleLogin = () => {
    if (form.email && form.password) {
      // TODO: gọi API thực tế
      router.push("/dashboard") // 👉 chuyển sang dashboard
    }
  }

  const handleRegister = () => {
    alert("Đăng ký thành công!")
    setIsRegistering(false)
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isRegistering ? "Đăng ký" : "Đăng nhập"}
        </h2>
        <Input
          className="mb-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          className="mb-4"
          type="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button
          className="w-full mb-2"
          onClick={isRegistering ? handleRegister : handleLogin}
        >
          {isRegistering ? "Đăng ký" : "Đăng nhập"}
        </Button>
        <p
          className="text-sm text-center text-blue-400 cursor-pointer"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}
        </p>
      </div>
    </div>
  )
}
