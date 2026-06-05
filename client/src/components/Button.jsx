function Button({
    title,
    onClick,
    type='button',
    buttonStyle,
    ...rest
}){
    return(
        <button
        type={type}
        className={`p-3 bg-primary text-black font-semibold rounded-md hover:opacity-90 transition-opacity cursor-pointer ${buttonStyle}`}
        onClick={onClick}
        {...rest}
        >
            {title}
        </button>
    )
}

export default Button