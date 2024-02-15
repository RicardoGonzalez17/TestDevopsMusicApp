import React, { useEffect, useState } from 'react'
import {FaCloudUploadAlt} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { allArtists, newArtist, reset } from '../features/artist/artistSlices'
import { newSong } from '../features/song/songSlice'
import { toast } from 'react-toastify'
import Spinner from "../components/Spinner"
import NewArtist from '../components/NewArtist'


const RegisterMusic = () => {

    const dispatch = useDispatch()
    const {artists} = useSelector((state) => state.artist)
    const {songs, isLoading, isError, isSuccess, message} = useSelector((state) => state.song)
    const [formData, setFormData] = useState({
        title:'',
        artistId:''
    })
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{
        if(artists.length ==0){
            setIsFirstRender(false)
            dispatch(allArtists())
        }
    
        if(isSuccess){
            toast.success('Has been successfully registered')
            dispatch(reset())
        }
        
        if(isError){
            toast.error(message)
            dispatch(reset())
        }
        return () => {
            dispatch(reset())
        }

    },[isError, isSuccess, isLoading])

    const onChangeHandler = (e)=>{
        setFormData((preveState)=>({
            ...preveState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch((newSong(formData)))
    }

    const onClickNewArtist = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

    if(isLoading){
        return <Spinner />
    }

  return (
    <>
    {isModalOpen && <NewArtist closeModal={closeModal} />}
    <div className='bg-slate-100 pt-32 w-full flex flex-col items-center min-h-screen'>
        <section>
            <h1 className='flex items-center font-sans font-semibold text-teal-400 text-3xl'>
               <FaCloudUploadAlt className="mr-2" /> Upload the best music
            </h1>
            <p>You can upload here. Please write all inputs</p>
        </section>
        <section className='flex justify-center p-2 w-full'>
            <form onSubmit={onSubmit} className='flex flex-col items-center content-center bg-white shadow-md rounded-md w-full max-w-md'>
                <div className='mb-4 w-3/4'> 
                    <label className="block text-gray-700 text-sm font-bold pt-2 mb-2" htmlFor="title">
                        Title
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="title" id="title" type="text" onChange={onChangeHandler} placeholder="Song title" value={formData.title} />
                    <label className="block text-gray-700 text-sm font-bold pt-2 mb-2" htmlFor="artist">
                        Artist
                    </label>
                    <select name='artistId' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full py-2 px-3' onChange={onChangeHandler}>
                        <option value='0' className='text-sm'>Choose an artist</option>
                        {artists.length > 0 ? 
                        (<>
                            {artists.map((artist) =>
                                <option key={artist._id} value={artist._id} className='text-sm'>{artist.name}</option>
                            )}
                        </>) : 
                        (<>
                        </>)
                        }
                    </select>
                    <label className='block text-gray-700 text-sm underline underline-offset-1 hover:cursor-pointer mb-2' onClick={onClickNewArtist}>New artist? Register here </label>
                </div>
                <button className="bg-teal-400 hover:bg-teal-800 text-white font-bold py-2 px-4 mb-3 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Upload music
                </button>
            </form>

        </section>
    </div>
    </>
  )
}

export default RegisterMusic