import { Plus } from "lucide-react";

function FabButton({
    onClick,
    ariaLabel,
    buttonStyle
}){
    return(
        <button
          onClick={onClick}
          aria-label={ariaLabel}
          className={`sm:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg active:scale-95 transition-transform duration-150 ${buttonStyle}`}
        >
          <Plus size={26} className="text-white" />
        </button>
    )
}

export default FabButton