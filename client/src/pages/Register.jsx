import logo from '../assets/logo.png'
import dashboardBackground from '../assets/dashboard-bg.png'
import Input from '../components/Input'
import { useState } from 'react'
import { register } from '../services/auth.service'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import AuthPanelLeft from '../components/auth/AuthPanelLeft'
import Button from '../components/Button'

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

        if (!form.firstName.trim()) {
            newErrors.firstName = 'First name is required'
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!form.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = 'Enter a valid email address'
        }

        const password = form.password

        if (!password) {
            newErrors.password = 'Password is required'
        } else {
            const errors = []

            if (!/[A-Z]/.test(password)) errors.push('One Uppercase letter')
            if (!/[a-z]/.test(password)) errors.push('One lowercase letter')
            if (!/\d/.test(password)) errors.push('One Number')
            if (!/[@$!%*?&]/.test(password)) errors.push('One special symbol')

            if (errors.length > 0) {
                newErrors.password = `Password should contain:\n${errors.join('\n')}`
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
            setErrors({})
            try {
                const response = await register(form)
                if (response.data) {
                    toast.success(response.message)
                    navigation('/login')
                }
            } catch (error) {
                if (error.status === 409) {
                    toast.error('Email already registered')
                } else {
                    toast.error('Something went wrong')
                    console.log(error)
                }
            }
        }
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Left Panel — hidden on small screens, visible from lg up */}
            <AuthPanelLeft />

            {/* Right Panel */}
            <div className="flex flex-col justify-center px-6 py-12 sm:px-12 flex-1 bg-[#11141d] min-h-screen lg:min-h-0">

                {/* Logo shown only on mobile (when left panel is hidden) */}
                <div className="flex flex-col items-center mb-8 lg:hidden">
                    <img src={logo} alt="Logo" className="w-40 sm:w-48 mb-2" />
                    <p className="text-primary text-sm text-center">
                        Take control of your spending.
                    </p>
                </div>

                <div className="w-full max-w-md mx-auto lg:mx-0">
                    <h2 className="text-2xl font-semibold text-white mb-1">Create Account</h2>
                    <p className="text-gray-500 text-sm mb-8">Start managing your finances today.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Name Row — stacks on very small screens */}
                        <div className="flex flex-col sm:flex-row gap-4">
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
                            type="email"
                        />

                        <Input
                            label="Password"
                            name="password"
                            value={form.password}
                            placeholder="Min. 8 characters"
                            onChange={handleChange}
                            errorMessage={errors.password}
                            type="password"
                        />


                        <Button
                        type='submit'
                        title='Create Account'
                        buttonStyle='mt-2'
                        />
                    </form>

                    <p className="text-center text-gray-500 text-xs mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
