import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

function Header({ firstName,showButton=true }) {
    const navigate=useNavigate();
    return (
        <div className='flex px-4 py-3 justify-between items-center bg-[#1f242d]'>
            <Link to='/'>
                <img src={logo} alt="" className='w-48' />
            </Link>
            <div className='flex gap-4'>
                {
                    showButton &&
                    <button className='bg-primary px-2 rounded-md font-semibold cursor-pointer' onClick={()=>navigate('/transaction/add')}>+ Add Transaction</button>
                }
                <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center font-semibold text-[#fff] cursor-pointer text-xl'>
                {firstName?.[0].toUpperCase()}
            </div>
            </div>
        </div>
    )
}

export default Header