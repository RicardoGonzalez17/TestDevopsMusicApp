import {FaSignInAlt, FaSignOutAlt, FaUser, FaMusic, FaUserAlt, FaUsers, FaCloudUploadAlt} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)

    const onClickLogout = async ()=> {
        await dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

  return (
    <header className='flex justify-between items-center border-b-2 border-teal-800 h-24 max-h-24 pl-14 pr-14 fixed top-0 menu w-full bg-white'>
        <div className='flex justify-between'>
            <Link to='/' className='font-sans font-semibold text-teal-800'>
            <div className='pt-1 pb-1 flex items-center'>
                <img src="https://ui-avatars.com/api/?name=G+Music&rounded=true&background=2dd4bf&color=FFFFFF&size=50" alt="logo" />
                  <p className='font-sans font-semibold'>USIC</p>
            </div>
            </Link>
            <ul className='flex items-center'>
                {user ? 
                (<>
                    {user.isAdmin ? 
                        (<>
                            <li className='pl-7'>
                            <Link to='/' className='flex items-center font-sans font-semibold text-teal-800'>
                                <FaMusic className='mr-2 text-teal-400'/> Music
                            </Link>
                            </li>
                            <li className='pl-7'>
                            <Link to='/registermusic' className='flex items-center font-sans font-semibold text-teal-800'>
                                <FaCloudUploadAlt className='mr-2 text-teal-400'/> Upload music
                            </Link>
                            </li>
                        </>) : 
                        (<>
                        
                        </>
                    )}
                </>): 
                (<></>)}
                </ul>
        </div>
        
        <ul className='flex items-center m-5 '>
            {user ? 
            (<>
                <li className='pl-7'>
                <Link onClick={onClickLogout} className='flex items-center font-sans font-semibold text-teal-800'>
                    <FaSignOutAlt className='mr-2 text-teal-400'/> Logout
                </Link>
                </li>
                <li className='pl-7'>
                <Link to='/library' className='flex items-center font-sans font-semibold text-teal-800'>
                    <FaMusic className='mr-2 text-teal-400'/> My library
                </Link>
                </li>
                <li className='pl-7'>
                <Link to='/profile' className='flex items-center font-sans font-semibold text-teal-800'>
                    <FaUserAlt className='mr-2 text-teal-400'/> My Profile
                </Link>
                </li>
                {user.isAdmin ? 
                    (<>
                        <li className='pl-7'>
                        <Link to='/users' className='flex items-center font-sans font-semibold text-teal-800'>
                            <FaUsers className='mr-2 text-teal-400'/> Users
                        </Link>
                        </li>
                    </>) : 
                    (<>
                    
                    </>
                )}
            </>) : 
            (<>
                <li className='pr-7'>
                <Link to='/login' className='flex items-center font-sans font-semibold text-teal-800'>
                    <FaSignInAlt  className='mr-2 text-teal-400'/> Login
                </Link>
                </li>
                <li >
                    <Link to='/register' className='flex items-center font-sans font-semibold text-teal-800'>
                        <FaUser className='mr-2 text-teal-400'/> Register
                    </Link>
                </li>
            </>
            )}
        </ul>
    </header>
  )
}

export default Header