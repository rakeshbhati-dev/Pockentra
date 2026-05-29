function Card({
    cardStyle,
    title,
    amount,
    color='text-white'
}){
    return(
        <div
        className={`bg-[#11141d] py-2 rounded-md px-4 ${cardStyle}`}
        >
            <h3 className={`text-xl font-semibold ${color}`}>{title}</h3>
            <p className={`font-semibold text-2xl ${color}`}>₹{amount}</p>
        </div>
    )
}

export default Card