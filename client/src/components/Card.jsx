function Card({
    cardStyle,
    title,
    amount,
    color = 'text-white',
    iconBg='bg-[#11141d]',
    icon: Icon
}) {
    return (
        <div
            className={`bg-[#11141d] py-2 rounded-md px-4 shadow-sm flex justify-between items-center ${cardStyle}`}
        >
            <div>
                <h3 className={`text-xl font-semibold ${color}`}>{title}</h3>
                <p className={`font-semibold text-2xl ${color}`}>₹{amount}</p>
            </div>
            {Icon &&
                <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg}`}
                >
                    <Icon className={`${color}`} />
                </div>

            }
        </div>
    )
}

export default Card