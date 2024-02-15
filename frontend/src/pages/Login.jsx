import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { login, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const{ email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    if(isSuccess) {
      navigate('/library')
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

    const userData = {
      email,
      password
    }

    dispatch(login(userData))

  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <div className='bg-slate-100 absolute w-full'>
      <section className="flex justify-center items-center h-screen ">
          <form onSubmit={onSubmit} className='flex flex-col items-center content-center bg-white shadow-md rounded-md w-full max-w-sm'>
              <div className='pt-4 flex items-center'>
                <img src="https://ui-avatars.com/api/?name=G+Music&rounded=true&background=2dd4bf&color=FFFFFF" alt="logo" />
                  <p className='font-sans font-semibold'>USIC</p>
              </div>
              <div className='mb-4  w-80'> 
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" id="email" type="email" placeholder="Email" onChange={onChange}/>
              </div>
              <div className="mb-6 w-80">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" id="password" type="password" placeholder="********" onChange={onChange}/>
                <div className="flex items-center justify-between">
                  <button className="bg-teal-400 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sign In
                  </button>
                  <a className="inline-block align-baseline font-bold text-sm text-teal-400 hover:text-teal-800" href="#">
                    Forgot Password?
                  </a>
                </div>
              </div>
          </form>
      </section>
    </div>
  )
}

export default Login