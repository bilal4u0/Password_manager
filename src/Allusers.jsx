import React from 'react'
import { useState, useEffect } from 'react'


const Allusers = () => {

    const [users, setusers] = useState([])
    const [deletedusers, setDeletedusers] = useState([])
    const [message, setmessage] = useState("")



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

    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: "DELETE",
                headers: { 'content-type': 'application/json' },
            })
            const data = await response.json()
            const deletedUser = users.find(user => user._id === userId);
            setDeletedusers([...deletedusers, deletedUser]);


            if (data.success) {
                setmessage("User deleted successfully ✅")
                // Remove the deleted user from the local state
                setusers(users.filter(user => user._id !== userId))
                // Clear message after 3 seconds
                setTimeout(() => setmessage(""), 3000)
            } else {
                setmessage("Failed to delete user ❌")
                setTimeout(() => setmessage(""), 3000)
            }
        } catch (error) {
            console.error("Error deleting user:", error)
            setmessage("Error deleting user ❌")
            setTimeout(() => setmessage(""), 3000)
        }
    }
    useEffect(() => {
        fetchusers()
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "/";
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-stretch p-4 sm:p-6">
                <div className="fixed top-0 left-0 right-0 z-10 bg-white/70 backdrop-blur border-b border-gray-200">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                            Password Manager
                        </h2>

                        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={handleLogout} aria-label="Logout">
                            <lord-icon
                                src="https://cdn.lordicon.com/rhyfwlig.json"
                                trigger="hover"
                                title="Logout"
                                style={{ width: '36px', height: '36px', cursor: 'pointer' }}>
                            </lord-icon>
                            <span className="hidden sm:inline text-gray-700 font-semibold">Logout</span>
                        </div>

                    </div>
                </div>

                <div className="w-full max-w-3xl mx-auto pt-24">
                    {message && (
                        <p className="mb-4 text-green-600 font-medium">{message}</p>
                    )}

                    {users.length > 0 ? (
                        <>
                            <div className="mb-3">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">All Registered Users</h3>
                            </div>
                            {/* Mobile: card list */}
                            <div className="md:hidden grid gap-3">
                                {users.map((user) => (
                                    <div key={user._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 border border-gray-200 hover:border-blue-300">
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col gap-4 text-sm flex-1">
                                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border-l-4 border-blue-400">
                                                    <span className="block text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">📧 Email Address</span>
                                                    <span className="text-gray-800 break-all font-semibold text-base">{user.email}</span>
                                                </div>
                                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border-l-4 border-green-400">
                                                    <span className="block text-xs font-bold text-green-600 uppercase tracking-wider mb-1">🔒 Password</span>
                                                    <span className="text-gray-800 break-all font-mono font-semibold text-base">{user.password}</span>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xyfswyxf.json"
                                                    trigger="morph"
                                                    state="morph-trash-full-to-empty"
                                                    colors="primary:#ef4444,secondary:#dc2626"
                                                    style={{ width: '36px', height: '36px', cursor: 'pointer' }}
                                                    className="hover:scale-110 transition-transform duration-200"
                                                    onClick={() => { deleteUser(user._id) }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>

                            {/* Tablet/Desktop: table with horizontal scroll if needed */}
                            <div className="hidden md:block bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-200">
                                <div className="w-full overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800">
                                            <tr>
                                                <th className="py-5 px-6 text-left text-white font-bold text-sm md:text-base uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-blue-300">📧</span>
                                                        Email Address
                                                    </div>
                                                </th>
                                                <th className="py-5 px-6 text-left text-white font-bold text-sm md:text-base uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-green-300">🔒</span>
                                                        Password
                                                    </div>
                                                </th>
                                                <th className="py-5 px-6 text-left text-white font-bold text-sm md:text-base uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-red-300">⚡</span>
                                                        Actions
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => (
                                                <tr key={user._id} className={`border-t hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 ${index % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'}`}>
                                                    <td className="py-4 px-6 text-gray-800 text-sm md:text-base break-all font-medium">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                            <span className="text-gray-800">{user.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-gray-800 text-sm md:text-base break-all font-mono font-medium">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                            <span className="text-gray-800">{user.password}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-gray-700 text-sm md:text-base">

                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/xyfswyxf.json"
                                                            trigger="morph"
                                                            state="morph-trash-full-to-empty"
                                                            colors="primary:#ef4444,secondary:#dc2626"
                                                            style={{ width: '36px', height: '36px', cursor: 'pointer' }}
                                                            className="hover:scale-110 transition-transform duration-200"
                                                            onClick={() => { deleteUser(user._id) }}>
                                                        </lord-icon>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500 mt-4">No users found.</p>
                    )}
                </div>
            </div>

        </>
    )
}

export default Allusers
