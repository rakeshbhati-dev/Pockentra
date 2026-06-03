import { formatAmount } from "../utils/format"

function Card({
    cardStyle,
    title,
    amount,
    color = 'text-white',
    iconBg = 'bg-[#11141d]',
    icon: Icon
}) {
    return (
        <div
            className={`bg-[#11141d] py-3 rounded-md px-4 shadow-sm flex justify-between items-center ${cardStyle}`}
        >
            <div className="min-w-0">
                <h3 className={`text-sm sm:text-xl font-semibold truncate ${color}`}>{title}</h3>
                <p className={`font-semibold text-lg sm:text-2xl truncate ${color}`}>{formatAmount(amount)}</p>
            </div>
            {Icon && (
                <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full flex-shrink-0 flex items-center justify-center ml-2 ${iconBg}`}>
                    <Icon size={18} className={`sm:w-5 sm:h-5 ${color}`} />
                </div>
            )}
        </div>
    )
}

export default Card
