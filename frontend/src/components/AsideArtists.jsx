const AsideArtists = () => {
  return (
    <div className="flex w-full flex-col align-middle">
        <span className="flex items-center">
            <span className="h-px flex-1 bg-white"></span>
            <span className="shrink-0 px-6 text-white">Artists of your favorite songs</span>
            <span className="h-px flex-1 bg-white"></span>
        </span>
        <section className="m-2">
            <ul>
                <li className="h-12 text-white flex items-center hover:bg-teal-800 rounded-lg pl-3 cursor-pointer">All</li>
                <li className="h-12 text-white flex items-center hover:bg-teal-800 rounded-lg pl-3 cursor-pointer">Artista</li>
            </ul>
        </section>
    </div>
  )
}

export default AsideArtists