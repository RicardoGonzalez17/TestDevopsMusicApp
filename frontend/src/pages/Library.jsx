import {React, useEffect} from 'react'
import AsideArtists from '../components/AsideArtists'
import Songs from '../components/Songs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Library = () => {

  const navigate = useNavigate()
  
  const {user} = useSelector((state)=> state.auth)

  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[user, navigate])

  return (
    
    <div className='bg-slate-100 absolute w-full flex top-24' style={{ height: 'calc(100% - 6rem)' }}>
        <aside className='flex bg-teal-600 w-1/5 h-full fixed' >
            <AsideArtists />
        </aside>
        <section className="flex justify-center items-start w-4/5 ml-auto animate__animated animate__backInRight">
            <Songs/>
        </section>
    </div>
  )
}

export default Library