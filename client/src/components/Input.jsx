import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

function Input({
    label,
    name,
    value,
    placeholder = '',
    onChange,
    type = 'text',
    inputStyle,
    divStyle,
    errorMessage,
    ...rest
}) {
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === 'password'
    const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type

    return (
        <div className={`flex-1 ${divStyle || ''}`}>
            {label && (
                <label className="block text-primary text-xs uppercase tracking-wide mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type={resolvedType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`bg-slate-800 rounded-md focus:outline-none focus:ring-1 focus:ring-primary py-2 px-3 w-full text-white placeholder-gray-500 ${isPassword ? 'pr-10' : ''} ${inputStyle || ''}`}
                    {...rest}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                        tabIndex={-1}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
            </div>
            {errorMessage && (
                <p className="text-red-500 text-xs pl-1 mt-1 whitespace-pre-line">
                    {errorMessage}
                </p>
            )}
        </div>
    )
}

export default Input