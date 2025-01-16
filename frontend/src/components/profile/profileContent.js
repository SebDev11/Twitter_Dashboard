import React, { useContext, useState, useRef, useEffect } from "react";
import Navbar from "../layout/navbar";
import { motion } from 'framer-motion';
import axios from "axios";
import { UserContext } from "../../provider/userProvider";
import TweetsSite from "./tweetsSite";
import LikesSite from "./likesSite";
import MediaSite from "./mediaSite";
import ReplisSite from "./replisSite";
import ProfileEditModal from "./editModal";

function ProfileContent({setIsSidebarOpen, setEditModalOpen}) {
    const [ userItem, setUserItem ] = useState([]);
    const [ navState, setNavState ] = useState('Tweets');
    const user = useContext(UserContext)
    useEffect(() => {        
        const getUserItems = async(id) => {
            try {
                const response = await axios.get(`http://localhost:8000/api/${id}/items`);
                setUserItem(response.data.items)
            } catch(err) {
                console.log(err.message)
            }
        }
        if(user.user) {
            getUserItems(user.user._id);
        }
    }, [user])

    return (
        <div className="h-screen w-full border !border-[#3A444C] overflow-y-auto no-scrollbar">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex flex-col py-[15px] pb-2.5 text-[19px] px-[15px] border !border-[#3A444C]'
            >
                <Navbar item={userItem} pageTitle={`${user.user && user.user.username}`} setIsSidebarOpen={setIsSidebarOpen} />
            </motion.div>
            {user.user && <div onClick={() => setIsSidebarOpen(false)}>
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
                        <p className="font-normal text-[21px] text-white">{ user.user.username}</p>
                        <p className="text-xl text-[#8899A6] font-normal">@{ user.user.email.split('@')[0]}</p>
                        <p className="text-xl text-white font-normal mt-1.5">{user.user.job}</p>
                        <div className="mt-1.5 flex">
                            <img src="./image/location.png" className="w-[19px] h-[19px]" />
                            <p className="text-xl font-normal text-[#8899A6] ml-[5px]">{user.user.location}</p>
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
                    <button onClick={() => setEditModalOpen(true)} className="border !border-[#1DA1F2] border-solid rounded-full h-[39px] w-28 text-[#1DA1F2] flex justify-center items-center">
                        Edit Profile
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-4 text-xl text-[#8899A6] font-normal h-[53px] items-center border-b-2 border-[#1C2733]">
                    <div className={`flex justify-center  h-full items-center ${navState == 'Tweets' &&  'text-[#1DA1F2] border-b-2 border-[#1DA1F2]'}`} onClick={() => setNavState('Tweets')}>Tweets</div>
                    <div className={`flex justify-center  h-full items-center ${navState == 'Tweets & replis' &&  'text-[#1DA1F2] border-b-2 border-[#1DA1F2]'}`} onClick={() => setNavState('Tweets & replis')}>Tweets & replis</div>
                    <div className={`flex justify-center  h-full items-center ${navState == 'Media' &&  'text-[#1DA1F2] border-b-2 border-[#1DA1F2]'}`} onClick={() => setNavState('Media')}>Media</div>
                    <div className={`flex justify-center  h-full items-center ${navState == 'Likes' &&  'text-[#1DA1F2] border-b-2 border-[#1DA1F2]'}`} onClick={() => setNavState('Likes')}>Likes</div>
                </div>
                {navState == "Tweets" && userItem && <TweetsSite items={userItem} />}
                {navState == "Tweets & replis" && <ReplisSite />}
                {navState == "Media" && <MediaSite />}
                {navState == "Likes" && <LikesSite />}
            </div>}           
        </div>
    )
}

export default ProfileContent;