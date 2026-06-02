import logo from '../assets/logo.png'
import dashboardBackground from '../assets/dashboard-bg.png'
import Input from '../components/Input'
import { useState } from 'react'
import { register } from '../services/auth.service'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Register() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const navigation = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const validate = () => {
        const newErrors = {}

        // First Name
        if (!form.firstName.trim()) {
            newErrors.firstName = 'First name is required'
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!form.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = 'Enter a valid email address'
        }

        // Password
        const password = form.password

        if (!password) {
            newErrors.password = 'Password is required'
        } else {
            const errors = []

            if (!/[A-Z]/.test(password)) {
                errors.push('One Uppercase letter')
            }

            if (!/[a-z]/.test(password)) {
                errors.push('One lowercase letter')
            }

            if (!/\d/.test(password)) {
                errors.push('One Number')
            }

            if (!/[@$!%*?&]/.test(password)) {
                errors.push('One special symbol')
            }

            if (errors.length > 0) {
                newErrors.password = `Password should contain:
${errors.join('\n')}`
            } else if (password.length < 8) {
                newErrors.password = 'Password must contain 8 characters'
            }
        }

        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = validate()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            setErrors({});
            try {
                const response = await register(form);
                console.log(response);
                if (response.data) {
                    toast.success(response.message)
                    navigation('/login')
                }
            } catch (error) {
                toast.error('Something went wrong')
                console.log(error);

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
                <h2 className="text-2xl font-semibold text-white mb-1">Create Account</h2>
                <p className="text-gray-500 text-sm mb-8">Start managing your finances today.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name Row */}
                    <div className="flex gap-4">
                        <Input
                            label="First Name"
                            name="firstName"
                            value={form.firstName}
                            placeholder="John"
                            onChange={handleChange}
                            errorMessage={errors.firstName}
                        />
                        <Input
                            label="Last Name"
                            name="lastName"
                            value={form.lastName}
                            placeholder="Doe"
                            onChange={handleChange}
                            errorMessage={errors.lastName}
                        />
                    </div>

                    <Input
                        label="Email"
                        name="email"
                        value={form.email}
                        placeholder="john@example.com"
                        onChange={handleChange}
                        errorMessage={errors.email}
                        type='email'
                    />

                    <Input
                        label="Password"
                        name="password"
                        value={form.password}
                        placeholder="Min. 8 characters"
                        onChange={handleChange}
                        errorMessage={errors.password}
                        type='password'
                    />

                    <button
                        type="submit"
                        className="py-3 mt-2 bg-primary text-black font-semibold rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center text-gray-500 text-xs mt-6">
                    Already have an account?{' '}
                    <Link to='/login' className="text-primary hover:underline">
                    Sign in</Link>
                </p>
            </div>
        </div>
    )
}

export default Register