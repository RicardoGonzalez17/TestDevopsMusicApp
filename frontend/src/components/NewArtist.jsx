import React, { useEffect, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { newArtist, reset } from '../features/artist/artistSlices'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from './Spinner'

const NewArtist = ({ closeModal }) => {

    const dispatch = useDispatch()
    const {artists, isError, isLoading, isSuccess, message} = useSelector((state) => state.artist)

    const [formData, setFormData] = useState({
        name: '',
        image: ''
    })

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        if(isSuccess){
            toast.success('Has been successfully registered')
        }

        return () => {
            dispatch(reset())
        }
    })

    const onSubmit = async (e) => {
        e.preventDefault()

        await dispatch(newArtist(formData))

    }

    const onChangeHandler = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }



  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className='bg-white p-5  rounded flex flex-col justify-center items-center gap-5 w-2/5'>
            <form onSubmit={onSubmit} className='flex flex-col items-center content-center bg-white shadow-md rounded-md w-full'>
                <h1 className="flex items-center font-sans font-semibold text-teal-800 text-3xl">
                    <FaUserAlt className="mr-2 text-teal-400"/>New artist
                </h1>
                <div className='mb-4 w-full'> 
                    <label className="block text-gray-700 text-sm font-bold pt-2 mb-2" htmlFor="title">
                        Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={onChangeHandler} name="name" id="name" type="text"  placeholder="Artist name" value={formData.name} />
                    <label className="block text-gray-700 text-sm font-bold pt-2 mb-2" htmlFor="artist">
                        URL Image
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={onChangeHandler} name="image" id="image" type="text"  placeholder="URL image" value={formData.image} />
                </div>
                <div className='flex gap-2'>
                    <button className="bg-gray-400 hover:bg-gray-800 text-white font-bold py-2 px-4 mb-3 rounded focus:outline-none focus:shadow-outline" onClick={closeModal} type="button">
                        Close
                    </button>
                    <button className="bg-teal-400 hover:bg-teal-800 text-white font-bold py-2 px-4 mb-3 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Register
                    </button>
                </div>
                </form>
        </div>
    </div>
    
  )
}

export default NewArtist