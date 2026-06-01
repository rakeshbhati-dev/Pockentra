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
    return (
        <div className={`flex-1 ${divStyle || ''}`}>
            {label && <label className="block text-primary text-xs uppercase tracking-wide mb-1">{label}</label>}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`bg-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-primary py-2 px-3 w-full text-white placeholder-gray-500 ${inputStyle || ''}`}
                {...rest}
            />
            {errorMessage && <p className="text-red-500 text-xs pl-1 mt-1">{errorMessage}</p>}
        </div>
    )
}

export default Input