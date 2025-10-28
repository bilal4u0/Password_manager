import React from 'react'
import { useState, useEffect } from 'react'

const Allusers = () => {
    const [users, setusers] = useState([])
    const [message, setmessage] = useState([])



    const fetchusers = async () => {

        let getdata = await fetch('http://localhost:3000/users', {
            method: "GET",
            headers: { 'content-type': 'application/json' },

        })
        const data = await getdata.json()

        if (data.success) {
            setusers(data.users);
        }

    }
    useEffect(() => {
        fetchusers()
    }, []);
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 sm:p-6">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 text-center">
                    All Registered Users
                </h2>

                {message && (
                    <p className="mb-4 text-green-600 font-medium">{message}</p>
                )}

                {users.length > 0 ? (
                    <div className="w-full max-w-3xl">
                        {/* Mobile: card list */}
                        <div className="md:hidden grid gap-3">
                            {users.map((user) => (
                                <div key={user._id} className="bg-white rounded-xl shadow p-4 border border-gray-200">
                                    <div className="flex flex-col gap-2 text-sm">
                                        <div>
                                            <span className="block text-gray-500">Email</span>
                                            <span className="text-gray-800 break-all">{user.email}</span>
                                        </div>
                                        <div>
                                            <span className="block text-gray-500">Password</span>
                                            <span className="text-gray-800 break-all">{user.password}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Tablet/Desktop: table with horizontal scroll if needed */}
                        <div className="hidden md:block bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
                            <div className="w-full overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-blue-100">
                                        <tr>
                                            <th className="py-2 px-4 text-left text-gray-700 font-semibold text-sm md:text-base">Email</th>
                                            <th className="py-2 px-4 text-left text-gray-700 font-semibold text-sm md:text-base">Password</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user._id} className="border-t hover:bg-blue-50 transition">
                                                <td className="py-2 px-4 text-gray-700 text-sm md:text-base break-all">{user.email}</td>
                                                <td className="py-2 px-4 text-gray-700 text-sm md:text-base break-all">{user.password}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4">No users found.</p>
                )}
            </div>

        </>
    )
}

export default Allusers