import {React, useEffect, useState} from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { reset, updateUser } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


const Profile = () => {

    const dispatch = useDispatch()
    const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(()=>{
      if (isFirstRender) {
        setIsFirstRender(false); // Cambiar el estado para las próximas renderizaciones
        if(user) {
          setFormData({
            name: user.name,
            email: user.email
          })
        }
        return;
      }
      
        if(isError){
          toast.error(message)
        }
    
        if(isSuccess) {
          toast.success("Information satisfactorily updated")
        }
        dispatch(reset())
    },[ user])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        newpassword2: ''
      })

      const{name, email, password, newpassword2} = formData

    const onChange = (e) => {
        setFormData((prevState)=>({
          ...prevState,
          [e.target.name]: e.target.value
        }))
      }

      const onSubmit = (e)=>{
        e.preventDefault()
        if(password !== newpassword2) {
            toast.error('The passwords aren´t the same')
          }
        
          const userData = {
            name,
            password
          }
          
        dispatch(updateUser(userData))

      }    

      if(isLoading){
        return <Spinner />
      }

  return (
    <div className='bg-slate-100 pt-32 w-full flex flex-col items-center min-h-screen'>
        <section>
            <h1 className='flex items-center font-sans font-semibold text-teal-400 text-3xl'>
               <FaUserAlt className="mr-2" /> My Profile
            </h1>
            <p>You can edit your info</p>
        </section>
        <section className="flex justify-center p-2 w-full">
      <form onSubmit={onSubmit} className='flex flex-col items-center content-center bg-white shadow-md rounded-md w-full max-w-md'>
          <div className='mb-4 w-3/4'> 
            <label className="block text-gray-700 text-sm font-bold pt-2 mb-2" htmlFor="name">
              Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" id="name" type="text" placeholder="Name" value={name} onChange={onChange}/>
          </div>
          <div className='mb-4 w-3/4'> 
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-not-allowed" disabled name="email" id="email" type="email" placeholder="Email" value={email} />
          </div>
          <div className='mb-4 w-3/4'> 
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              New Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" id="newpassword" type="password" placeholder="New Password" value={password} onChange={onChange}/>
          </div>
          <div className='mb-4 w-3/4'> 
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">
              Repeat new password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="newpassword2" id="newpassword2" type="password" placeholder="Repeat new password" value={newpassword2} onChange={onChange}/>
          </div>
          <button className="bg-teal-400 hover:bg-teal-800 text-white font-bold py-2 px-4 mb-3 rounded focus:outline-none focus:shadow-outline" type="submit">
              Update
          </button>
      </form>
    </section>
    </div>
  )
}

export default Profile