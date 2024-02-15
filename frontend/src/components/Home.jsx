import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Song from "./Song"
import { useEffect } from "react"
import { reset } from "../features/auth/authSlice"

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)
 
  
  useEffect(()=>{
    return () => {
      dispatch(reset())
    }
  })

/*
    Cuando haya un usuario logueado en esta pantalla se mostrarán todas las canciones con un buscador para
    buscar las canciones por nombre y agregarlas a la libreria
*/

  if(user){
    return(
      <div className="bg-gradient-to-r from-teal-800 to-teal-600 h-screen">
      <Song />
      </div>
    )
  }

  return (
    <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Listen your favorite song in
        <strong className="font-extrabold text-teal-600 sm:block animate__animated animate__backInDown"> G-MUSIC </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
        numquam ea!
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {user ? 
        // FALTA AGREGAR LA VALICACIÓN DEL STATE MUSIC, SI NO HAY MÚSICA, PERO SI USUARIO
        (<>
          <Link
            className="block w-full rounded bg-teal-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring active:bg-teal-500 sm:w-auto"
            to={'library'}
          >
            My Library
          </Link>
        </>) : 
        (<>
          <Link
            className="block w-full rounded bg-teal-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring active:bg-teal-500 sm:w-auto"
            to={'register'}
          >
            Register
          </Link>

          <Link
            className="block w-full rounded px-12 py-3 text-sm font-medium text-teal-600 shadow hover:text-teal-700 focus:outline-none focus:ring active:text-teal-500 sm:w-auto"
            to={'login'}
          >
            Login
          </Link>
        </>)
        }
        
      </div>
    </div>
  </div>
</section>
  )
}

export default Home