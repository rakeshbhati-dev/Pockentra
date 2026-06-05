import logo from '../assets/logo.png'
import dashboardBackground from '../assets/dashboard-bg.png'

function AuthPanelLeft() {
    return (
        <div className="hidden lg:flex flex-col w-[50%] bg-[#0c0e13] justify-center items-center overflow-hidden">
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
    )
}

export default AuthPanelLeft
