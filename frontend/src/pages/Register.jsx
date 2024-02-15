import { useState, useEffect } from "react"
import {FaUser} from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { register, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const{name, email, password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    if(isSuccess) {
      toast.success("Has been successfully registered")
      navigate('/login')
    }

    dispatch(reset())

  },[user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e)=>{
    e.preventDefault()
    
    if(password !== password2) {
      toast.error('Los passwords no coinciden')
    }
    else {
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))
    }
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <div className='bg-slate-100 pt-32 w-full flex flex-col items-center min-h-screen'>
    <section >
      <h1 className="flex items-center font-sans font-semibold text-teal-800 text-3xl">
        <FaUser className="mr-2 text-teal-400"/>Register
      </h1>
      <p >Form about new user</p>
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
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" id="email" type="email" placeholder="Email" value={email} onChange={onChange}/>
          </div>
          <div className='mb-4 w-3/4'> 
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" id="password" type="password" placeholder="Password" value={password} onChange={onChange}/>
          </div>
          <div className='mb-4 w-3/4'> 
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">
              Repeat password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password2" id="password2" type="password" placeholder="Repeat password" value={password2} onChange={onChange}/>
          </div>
          <button className="bg-teal-400 hover:bg-teal-800 text-white font-bold py-2 px-4 mb-3 rounded focus:outline-none focus:shadow-outline" type="submit">
              Register
          </button>
      </form>
    </section>
    </div>
  )
}

export default Register