import React, { useContext, useState, useRef, useEffect } from "react";
import Navbar from "../layout/navbar";
import { motion } from 'framer-motion';
import axios from "axios";
import { UserContext } from "../../provider/userProvider";

function ProfileContent({setIsSidebarOpen}) {
    const [ userItem, setUserItem ] = useState({})
    const user = useContext(UserContext)
    useEffect(() => {
        const getUserItems = async(id) => {
            try {
                const response = await axios.get(`http://localhost:8000/api/:${id}/items`);
                setUserItem(response.data.items)
            } catch(err) {
                console.log(err.message)
            }
        }
        user.user && getUserItems(user.user._id);
    }, [])
    console.log(userItem)
    return (
        <div className="h-screen w-full border !border-[#3A444C] overflow-y-auto no-scrollbar">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex flex-col py-[15px] pb-2.5 text-[19px] px-[15px] border !border-[#3A444C]'
            >
                <Navbar item={userItem} pageTitle={`${user.user && user.user.username}`} setIsSidebarOpen={setIsSidebarOpen} />
            </motion.div>
            <div onClick={() => setIsSidebarOpen(false)}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex"
                >
                    <img src = "./image/bg_profile.png" className="grow" />
                </motion.div>
                <div className="px-[13px] py-[11px] flex justify-between">
                    <div className="-mt-20">
                        <img src="./image/avatar.png" className="w-[139px] h-[139px] border-4 rounded-full border-black" />
                        <p className="font-normal text-[21px] text-white">{user.user && user.user.username}</p>
                        <p className="text-xl text-[#8899A6] font-normal">@{user.user && user.user.email.split('@')[0]}</p>
                        <p className="text-xl text-white font-normal mt-1.5">Product Designer</p>
                        <div className="mt-1.5 flex">
                            <img src="./image/location.png" className="w-[19px] h-[19px]" />
                            <p className="text-xl font-normal text-[#8899A6] ml-[5px]">London</p>
                            <img src="./image/calendar.png" className="w-[19px] h-[19px] ml-[5px]" />
                            <p className="text-xl font-normal text-[#8899A6] ml-1.5">Joined September 2011</p>
                        </div>
                        <div className="flex mt-2.5">
                            <div className="flex">
                                <p className="text-xl text-white font-normal">569</p>
                                <p className="text-xl text-[#8899A6] font-normal ml-1">Following</p>
                            </div>
                            <div className="flex ml-4">
                                <p className="text-xl text-white font-normal">72</p>
                                <p className="text-xl text-[#8899A6] font-normal ml-1">Followers</p>
                            </div>
                        </div>
                    </div>
                    <div className="border !border-[#1DA1F2] border-solid rounded-full h-[39px] w-28 text-[#1DA1F2] flex justify-center items-center">
                        Edit Profile
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-xl text-[#8899A6] font-normal h-[53px] items-center border-b-2 border-[#1C2733]">
                    <div className="flex justify-center text-[#1DA1F2] border-b-2 border-[#1DA1F2] h-full items-center">Tweets</div>
                    <div className="flex justify-center  h-full items-center">Tweets & replis</div>
                    <div className="flex justify-center  h-full items-center">Media</div>
                    <div className="flex justify-center  h-full items-center">Likes</div>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-2.5 px-[15px] border !border-[#3A444C]"
                >
                    <div className="">
                        <div className="flex">
                            <img className='w-[49px] h-[49px]' src="./image/devon.png" alt='' />
                            <div className="ml-2.5 grow">
                                <p className='font-normal text-[15px] text-white'>{user.user.username} <span className="text-[#8899A6]">@{user.user.email.split('@')[0]}·23s</span></p>
                                <p className='font-normal text-[15px] text-white'>Tom is in a big hurry.</p>
                                <div className="py-2.5">
                                    <img src={`./image/placeholder.png`} alt="ItemImage" className="w-full" />
                                </div>
                                <div className="grid grid-cols-4 gap-4 py-1 font-normal text-[13px] text-[#8899A6]">
                                    {/* <div className="flex" onClick={() => {user.user && user.user._id !== data.userId && setShowBar(data._id)}}> */}
                                    <div className="flex">
                                        <img src="./image/comment.png" className="w-[18px] h-[18px]" />
                                        <p className="ml-2.5">61</p>
                                    </div>
                                    <div className="flex">
                                        <img src="./image/retweet.png" className="w-[18px] h-[18px]" />
                                        <p className="ml-2.5">12</p>
                                    </div>
                                    <div className="flex">
                                        <img src="./image/like.png" className="w-[18px] h-[18px]" />
                                        <p className="ml-2.5 text-[#F4245E]">6.2K</p>
                                    </div>
                                    <div className="flex">
                                        <img src="./image/share.png" className="w-[18px] h-[18px]" />
                                        <p className="ml-2.5">61</p>
                                    </div>
                                </div>                
                                
                                <div className="py-2.5 text-[13px] font-normal text-[#1DA1F2]">Show this thread</div> 
                            </div> 
                            
                        </div>        
                            
                    </div>
                </motion.div>
            </div>            
        </div>
    )
}

export default ProfileContent;