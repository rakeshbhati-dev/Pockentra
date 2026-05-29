import logo from '../assets/logo.png'
import dashboardBackground from '../assets/dashboard-bg.png'
import Input from '../components/Input'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { login } from '../services/auth.service'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContextProvider'

function Login() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const navigate=useNavigate()
    const {setToken}=useUser()

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
                const response=await login(form)
                if(response){
                    toast.success(response.message);
                    localStorage.setItem('token',response.token);
                    setToken(response.token)
                    navigate('/')
                }
            } catch (error) {
                if(error.status===401){
                    toast.error('Invalid credentials');
                }
                else{
                    toast.error('Something went wrong');
                    console.log(error);
                }
                
            }
        }
    }

    return (
        <div className="flex h-screen">
            {/* Left Panel */}
            <div className="flex flex-col w-[50%] bg-[#0c0e13] justify-center items-center overflow-hidden">
                <div className="z-10 mb-6">
                    <img src={logo} alt="Logo" className="w-xs" />
                    <h3 className="text-primary text-center">
                        Take control of your spending.
                    </h3>
                </div>
                <div className="relative w-full flex justify-center items-end">
                    <img
                        src={dashboardBackground}
                        alt="Dashboard"
                        className="w-[95%] object-contain relative z-10"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#11141d] via-[#11141d]/80 to-transparent z-20 pointer-events-none" />
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex flex-col justify-center p-12 flex-1 bg-[#11141d]">
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

                    <div className="flex justify-end -mt-2">
                        <a href="/forgot-password" className="text-primary text-xs hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 mt-2 bg-primary text-black font-semibold rounded-md hover:opacity-90 transition-opacity"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center text-gray-500 text-xs mt-6">
                    Don't have an account?{' '}
                    <Link to='/register' className="text-primary hover:underline">
                    Create one</Link>
                </p>
            </div>
        </div>
    )
}

export default Login