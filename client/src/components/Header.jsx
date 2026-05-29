import logo from '../assets/logo.png'

function Header({ firstName }) {
    return (
        <div className='flex px-4 py-3 justify-between items-center bg-[#1f242d]'>
            <div>
                <img src={logo} alt="" className='w-48' />
            </div>
            <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center font-semibold text-[#fff] cursor-pointer text-xl'>
                {firstName[0].toUpperCase()}
            </div>
        </div>
    )
}

export default Header