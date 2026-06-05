function Button({
    title,
    onClick,
    type='button',
    buttonStyle,
}){
    return(
        <button
        type={type}
        className={`py-3 bg-primary text-black font-semibold rounded-md hover:opacity-90 transition-opacity cursor-pointer ${buttonStyle}`}
        onClick={onClick}
        >
            {title}
        </button>
    )
}

export default Button