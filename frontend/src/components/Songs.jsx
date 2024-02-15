import React from 'react'

const Songs = () => {
  return (
    <div className='flex flex-col'>
        <section className="group relative block bg-black">
            <img
                alt="Artist"
                src="https://res.cloudinary.com/dewjlaphv/image/upload/v1703310464/Artists/Panter%20Belico_1703310462694.jpg"
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />
            <div className="relative p-4 sm:p-6 lg:p-8">
                <p className="text-sm font-medium uppercase tracking-widest text-teal-500">Artist</p>

                <p className="text-xl font-bold text-white sm:text-2xl ">Panter Belico</p>

                <div className="mt-32 sm:mt-48 lg:mt-64">
                <div
                    className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                >
                    <p className="text-sm text-white">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic asperiores
                    quibusdam quidem voluptates doloremque reiciendis nostrum harum. Repudiandae?
                    </p>
                </div>
                </div>
            </div>
        </section>
        <div className="bg-white shadow-md rounded-md overflow-hidden w-full max-h-full mx-auto mt-2 ">
            <div className="bg-gray-100 py-2 px-4">
                <h2 className="text-xl font-semibold text-gray-800">Your favorite songs</h2>
            </div>
            <ul className="divide-y divide-gray-200">
                <li className="flex items-center py-4 px-6">
                    <span className="text-gray-700 text-lg font-medium mr-4">1.</span>
                    <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-800">Emily Jones</h3>
                    </div>
                </li>
                <li className="flex items-center py-4 px-6">
                    <span className="text-gray-700 text-lg font-medium mr-4">2.</span>
                    <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-800">David Lee</h3>
                    </div>
                </li>
                <li className="flex items-center py-4 px-6">
                    <span className="text-gray-700 text-lg font-medium mr-4">3.</span>
                    <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-800">Sophia Williams</h3>
                    </div>
                </li>
                <li className="flex items-center py-4 px-6">
                    <span className="text-gray-700 text-lg font-medium mr-4">4.</span>
                    <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-800">Michael Chen</h3>
                    </div>
                </li>
                <li className="flex items-center py-4 px-6">
                    <span className="text-gray-700 text-lg font-medium mr-4">5.</span>
                    <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-800">Mia Davis</h3>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Songs