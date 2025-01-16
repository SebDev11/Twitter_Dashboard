import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { UserContext } from "../../provider/userProvider";
import axios from "axios";

function ProfileEditModal({setEditModalOpen}) {

    const user = useContext(UserContext)
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ job, setJob ] = useState('');

    const data = {
        username: `${firstName} ${lastName}`,
        job: job,
        location: location,
        email: user.user.email
    }

    const handleProfileEdit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:8000/api/${user.user._id}`, data);
            console.log(response.data.message)
        } catch(err) {
            console.log(err.message)
        }
        setEditModalOpen(false)
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed flex justify-center items-center top-0 left-0 w-full h-screen backdrop-blur-sm'
            >
                <motion.div
                    initial={{ scale: 0, rotate: '12.5deg' }}
                    animate={{ scale: 1, rotate: '0deg' }}
                    exit={{ scale: 0, rotate: '0deg' }}
                    className='relative bg-[#182b41] rounded-2xl shadow-4xl w-[1000px]'
                >
                    <div className="flex relative">
                        <img src="./image/bg_profile.png" className="h-40 grow rounded-t-2xl" />
                    </div>
                    <img src="./image/avatar.png" className="h-32 w-32 absolute -mt-36 ml-4" />
                    <form className="p-4" onSubmit={(e) => handleProfileEdit(e)}>
                        <div className='mt-8 bg-[#182b41] rounded-xl'>
                            <div className="flex justify-between">
                                <div className="pr-2 md:w-1/2 md:mb-0">
                                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                        First Name
                                    </label>
                                    <input onChange={(e) => { setFirstName(e.target.value) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder={user.user.username.split(' ')[0]} />
                                </div>
                                <div className="pl-2 md:w-1/2">
                                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                        Last Name
                                    </label>
                                    <input onChange={(e) => { setLastName(e.target.value) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder={user.user.username.split(' ')[1]} />
                                </div>
                            </div> 
                        </div>
                        <div className="flex flex-wrap -mx-3 mt-2">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                                    Job Title
                                </label>
                                <input onChange={(e) => { setJob(e.target.value) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Input Job Title" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mt-2">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                                    Location
                                </label>
                                <input onChange={(e) => { setLocation(e.target.value) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Input Location" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                          <button className="rounded-full h-[39px] w-28 bg-[#1DA1F2] text-white justify-center items-center">Edit</button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ProfileEditModal;