import { useRouter } from 'next/router'
import React, { useState } from 'react'

const RecordForm = ({ entry, onSubmit }) => {

    const router = useRouter()

    const [data, setData] = useState(entry)

    const handleChange = (type, value) => {
        setData({ ...data, [type]: value })
    }

    const handleCancel = () => {
        router.push("/")
    }

    return (
        <div className='p-4'>
            <div className='flex flex-col mx-auto max-w-80  p-4 shadow-sm gap-4 w-full'>
                <div >
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input
                        type="text"
                        id="name"
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name"
                        required />
                </div>
            </div>
            <div className='flex flex-col mx-auto max-w-80  p-4 shadow-sm gap-4 w-full'>
                <div >
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your description</label>
                    <textarea
                        id="message"
                        rows="4"
                        onChange={(e) => handleChange('description', e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Description here">
                    </textarea>
                </div>
                <div className='flex justify-center'>

                    <button
                        type="button"
                        onClick={handleCancel}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => onSubmit(data)}
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Create
                    </button>
                </div>
            </div>

        </div>
    )
}

export default RecordForm