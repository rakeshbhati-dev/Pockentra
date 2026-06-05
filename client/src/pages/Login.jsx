import logo from '../assets/logo.png'
import dashboardBackground from '../assets/dashboard-bg.png'
import Input from '../components/Input'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { login } from '../services/auth.service'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContextProvider'
import Button from '../components/Button'
import AuthPanelLeft from '../components/auth/AuthPanelLeft'

function Login() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const { setToken } = useUser()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const validate = () => {
        const newErrors = {}

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!form.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = 'Enter a valid email address'
        }

        if (!form.password) newErrors.password = 'Password is required'
        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = validate()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            setErrors({})
            try {
                const response = await login(form)
                if (response) {
                    toast.success(response.message)
                    localStorage.setItem('token', response.token)
                    setToken(response.token)
                    navigate('/')
                }
            } catch (error) {
                if (error.status === 401) {
                    toast.error('Invalid credentials')
                } else {
                    toast.error('Something went wrong')
                    console.log(error)
                }
            }
        }
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Left Panel — hidden on mobile */}
            <AuthPanelLeft />

            {/* Right Panel */}
            <div className="flex flex-col justify-center px-6 py-12 sm:px-12 flex-1 bg-[#11141d] min-h-screen lg:min-h-0">

                {/* Logo shown only on mobile */}
                <div className="flex flex-col items-center mb-8 lg:hidden">
                    <img src={logo} alt="Logo" className="w-40 sm:w-48 mb-2" />
                    <p className="text-primary text-sm text-center">
                        Take control of your spending.
                    </p>
                </div>

                <div className="w-full max-w-md mx-auto lg:mx-0">
                    <h2 className="text-2xl font-semibold text-white mb-1">Welcome Back</h2>
                    <p className="text-gray-500 text-sm mb-8">Sign in to your account to continue.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            label="Email"
                            name="email"
                            value={form.email}
                            placeholder="john@example.com"
                            onChange={handleChange}
                            errorMessage={errors.email}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            placeholder="Enter your password"
                            onChange={handleChange}
                            errorMessage={errors.password}
                        />

                        {/* <div className="flex justify-end -mt-2">
                            <a href="/forgot-password" className="text-primary text-xs hover:underline">
                                Forgot password?
                            </a>
                        </div> */}

                        <Button
                        type='submit'
                        title='Sign In'
                        buttonStyle='mt-2'
                        />
                    </form>

                    <p className="text-center text-gray-500 text-xs mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
