import React from "react";
import Navbar from "../layout/navbar";
import { motion } from 'framer-motion';

function MainContent({setIsSidebarOpen}) {
    return (
        <div className="h-screen w-full border !border-[#3A444C] overflow-y-auto no-scrollbar">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='flex flex-col pt-[15px] pb-2.5 text-[19px] px-[15px] border !border-[#3A444C]'
            >
                <Navbar pageTitle='Home' setIsSidebarOpen={setIsSidebarOpen} />
            </motion.div>
            <div onClick={() => setIsSidebarOpen(false)}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-2.5 px-[15px] border !border-[#3A444C]"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <div className="">
                        <div className="items-center flex flex-row">
                            <img className='w-[49px] h-[49px]' src="./image/avatar.png" alt='' />
                            <p className="ml-3 text-xl text-[#8899A6]">What's happening?</p>
                        </div>        
                        <div className="flex justify-between items-center">
                            <div className="ml-[58px] flex items-center flex-row">
                                <img src="./image/photo.png" className="h-6 w-6" />
                                <img src="./image/gif.png" className="h-6 w-6 ml-3" />
                                <img src="./image/poll.png" className="h-6 w-6 ml-3" />
                                <img src="./image/emoji.png" className="h-6 w-6 ml-3" />
                                <img src="./image/schedule.png" className="h-6 w-6 ml-3" />
                            </div>
                            <div className="w-[79px] h-[39px] bg-[#1DA1F2] rounded-full text-[15px] font-normal flex items-center justify-center text-white">
                                Tweet
                            </div>
                        </div>      
                    </div>
                </motion.div>
                <div className="h-[9px] bg-[#1C2733] border !border-[#3A444C]"></div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-2.5 px-[15px] border !border-[#3A444C]"
                >
                    <div className="">
                        <div className="flex">
                            <img className='w-[49px] h-[49px]' src="./image/devon.png" alt='' />
                            <div className="ml-2.5 grow">
                                <p className='font-normal text-[15px] text-white'>Devon Lane <span className="text-[#8899A6]">@marcelosalomao·23s</span></p>
                                <p className='font-normal text-[15px] text-white'>Is this big enough for you?</p>
                                <div className="py-2.5">
                                    <img src="./image/placeholder.png" className="w-full" />
                                </div>
                                <div className="grid grid-cols-4 gap-4 py-1 font-normal text-[13px] text-[#8899A6]">
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
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-2.5 px-[15px] border !border-[#3A444C]"
                >
                    <div className="">
                        <div className="flex flex-row">
                            <img className='w-[49px] h-[49px]' src="./image/esther.png" alt='' />
                            <div className="ml-2.5 grow">
                                <p className='font-normal text-[15px] text-white'>Esther Howard <span className="text-[#8899A6]">@andrebiachi·23s</span></p>
                                <p className='font-normal text-[15px] text-white'>Are you ready for your big date?</p>
                                <div className="py-2.5">
                                    <img src="./image/esther_image.png" className="w-full" />
                                </div>
                            </div> 
                            
                        </div>        
                            
                    </div>
                </motion.div>
            </div>
            
        </div>
    )
}

export default MainContent;