import { deleteRecord, getRecords } from '@/utils/recordsFunctions'
import React, { useState, useEffect } from 'react'
import Spinner from './Spinner'
import { useRouter } from 'next/router'

const MainPage = () => {

    const router = useRouter()

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchRecords = async () => {
        try {
            const response = await getRecords()

            console.log(response)
            setData(response.data)
            setIsLoading(false)
            return response.data;
        }
        catch (error) {
            console.log(error)
            setIsLoading(false)
        }

    }

    const handleDeleteRecord = async (id) => {
        try {
            const response = await deleteRecord(id)

            if (response && response.acknowledged) {
                const refreshed = await getRecords();
                setData(refreshed.data);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleEditRecord = (id) => {
        router.push('/edit?id=${id}')
    }

    useEffect(() => {
        fetchRecords()
    }, [data])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="p-4 flex flex-wrap gap-4">
            {data?.map((record) => (
                <div key={record._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {record.name}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {record.description}
                    </p>
                    <button
                        type="button"
                        onClick={() => handleEditRecord(record._id)}
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={() => handleDeleteRecord(record._id)}
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Delete
                    </button>

                </div>
            ))}
        </div>
    )

}

export default MainPage