import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { allSongs, reset } from '../features/song/songSlice'
import { FaRegHeart } from 'react-icons/fa' 
import Spinner from './Spinner'



const Song = () => {

    const dispatch = useDispatch()
    const {songs, isLoading, isSuccess, isError, message} = useSelector((state) => state.song)

    useEffect(()=>{
        dispatch(allSongs())

        return () => {
            dispatch(reset())
        }
        
    },[])

    if(isLoading){
        return <Spinner />
    }
  return (
    <>
    {songs && songs.length > 0 ? 
    (<>
        <div className='flex flex-col w-full pt-32' >
        {songs.map((song) => 
                <div key={song._id} className=" w-2/5 mx-auto mb-3 p-2 justify-between  hover:dark:bg-teal-900 cursor-pointer rounded border-b-2  ">
                    <div className="flex items-center justify-between">
                        <div>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{song.title}</h5>
                            <span className="text-md font-bold text-teal-600">{song.artist.name}</span>
                        </div>
                        <div className="flex">
                            <FaRegHeart  className='size-6 text-white' />
                            {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Like</a> */}
                        </div>
                    </div>
                </div>
            
        )}
        </div>
    </>): 
    (<>

    </>)}
    </>
    
  )
}

export default Song