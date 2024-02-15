import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { allUsers, reset, updateAdminUser } from '../features/user/userSlice'
import Spinner from "../components/Spinner"

const Users = () => {

    const [inputValue, setInputValue] = useState('');

    const {users, isLoading, isError, message, isSuccess} = useSelector((state)=>state.user)
    const [isFirstRender, setIsFirstRender] = useState(true);

    const dispatch = useDispatch()

    useEffect(()=> {
        if (isFirstRender) {
            setIsFirstRender(false); // Cambiar el estado para las próximas renderizaciones
            dispatch(allUsers())
            return;
        }
        

    },[users])

    const handleOnChangeCheckebox = (userId, isAdmin) => {
        const userData = {
            _id: userId,
            isAdmin
        }
        dispatch(updateAdminUser(userData))

        if(isSuccess){
            toast.success('Information satisfactorily updated')
        }

        if(isError){
            toast.error(message)
        }

        dispatch(reset())
    }

    const handleOnChangeInput = (value)=>{
        setInputValue(value)
    }

    const filteredUsers = users ? users.filter((u) => new RegExp(inputValue, 'i').test(u.email)) : null

    if(isLoading){
        return <Spinner />
    }

  return (
    <div className = 'bg-slate-100 pt-32 w-full flex flex-col min-h-screen items-center'>
        <div className=" flex w-3/4 pb-1">
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="text" value={inputValue} onChange={(event)=>handleOnChangeInput(event.target.value)} className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for name" />
            </div>
        </div>
        <table className="text-sm w-3/4 text-left rtl:text-right text-white ">
        <thead className="text-xs text-white uppercase dark:bg-teal-800 dark:text-white">
            <tr className='w-52'>
                <th scope="col" className="p-4">
                <th scope="col" className="">
                    Admin
                </th>
                </th>
                <th scope="col" className="px-6 py-3">
                    User
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>

            </tr>
        </thead>
        <tbody>
            {filteredUsers ? 
                (<>
                    {filteredUsers.map((user=> 
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={user._id}>
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input checked={user.isAdmin} onChange={()=>handleOnChangeCheckebox(user._id, !user.isAdmin)} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user.name}
                            </th>
                            <td className="px-6 py-4">
                                {user.email}
                            </td>
                        </tr>
                    ))}
                </>) : 
                (<>
                    <h1 className='w-full'>No hay datos para mostrar</h1>
                </>)
            }
        </tbody>
    </table>
    </div>
  )
}

export default Users