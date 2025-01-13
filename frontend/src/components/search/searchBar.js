import React, { useState } from "react";
import { motion } from "framer-motion";

function SearchBar() {

    return (
        <div className={`px-[30px] py-2.5 mr-[88px] w-1/3 hidden lg:block `}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='rounded-full bg-[#283340] py-2.5 flex items-center px-4 font-normal text-base'
            >
                <img src="./image/search.png" className="w-[19px] h-[19px]" />
                <p className="ml-[15px] text-[#8899A6]">Search Twitter</p>                
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='rounded-2xl bg-[#283340] items-center font-normal text-base mt-4'
            >
                <div className="pt-[11px] pb-1.5 px-4 font-normal text-white text-xl border-b-2 border-[#3A444C]">
                    What's happening
                </div>
                <div className="px-[15px] py-2.5 flex justify-between border-b-2 border-[#3A444C]">
                    <div className="font-normal w-2/3">
                        <p className="text-[14px] text-[#8899A6]">Covid · Last night</p>
                        <p className="text-[15px] text-white my-1.5">Engand' s Chief Medical Officer says the UK is at the most dangerous time of the pandemic</p>
                        <p className="text-[14px] text-[#8899A6]">Trending with <span className="text-[#1DA1F2]">#covid19</span> </p>
                    </div>
                    <img src="./image/thumbnail.png" className="w-[71px] h-[69px] rounded-xl" />
                </div>
                <div className="px-[15px] py-2.5 flex justify-between border-b-2 border-[#3A444C]">
                    <div className="font-normal w-2/3">
                        <p className="text-[14px] text-[#8899A6]">US news · 4h ago</p>
                        <p className="text-[15px] text-white my-1.5">Parler may go offline following suspensions by Amazon, Apple and Google</p>
                        <p className="text-[14px] text-[#8899A6]">Trending with <span className="text-[#1DA1F2]">#trump</span> </p>
                    </div>
                    <img src="./image/news.png" className="w-[71px] h-[69px] rounded-xl" />
                </div>  
                <div className="px-[15px] py-2.5 flex justify-between border-b-2 border-[#3A444C]">
                    <div className="font-normal w-2/3">
                        <p className="text-[14px] text-[#8899A6]">India · 1h ago</p>
                        <p className="text-[15px] text-white my-1.5">India vs Australia: India hold on to earn a draw on Day 5 in Sydney Test</p>
                        <p className="text-[14px] text-[#8899A6]">Trending with <span className="text-[#1DA1F2]">#sport</span> </p>
                    </div>
                    <img src="./image/india.png" className="w-[71px] h-[69px] rounded-xl" />
                </div>
                <div className="p-[15px] text-[#1DA1F2] text-[15px] font-normal">
                    Show more
                </div>            
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='rounded-2xl bg-[#283340] items-center font-normal text-base mt-4'
            >
                <div className="pt-[11px] pb-1.5 px-4 font-normal text-white text-xl border-b-2 border-[#3A444C]">
                    Who to follow
                </div>  
                <div className="px-4 py-2.5 flex justify-between border-b-2 items-center border-[#3A444C]">
                    <div className="flex">
                        <img src="./image/bessie.png" className="w-[49px] h-[49px] rounded-xl" />
                        <div className="text-base ml-2.5">
                            <p className="text-white">Bessie Cooper</p>
                            <p className="text-[#8899A6]">@alessandroveronezi</p>
                        </div>
                    </div>
                    <div className="w-[80px] h-[30px] flex justify-center items-center rounded-full border-2 border-[#1DA1F2] text-[#1DA1F2]">Follow</div>
                </div>
                <div className="px-4 py-2.5 flex justify-between border-b-2 items-center border-[#3A444C]">
                    <div className="flex">
                        <img src="./image/jenny.png" className="w-[49px] h-[49px] rounded-xl" />
                        <div className="text-base ml-2.5">
                            <p className="text-white">Jenny Wilson</p>
                            <p className="text-[#8899A6]">@gabrielcantarin</p>
                        </div>
                    </div>
                    <div className="w-[80px] h-[30px] flex justify-center items-center rounded-full border-2 border-[#1DA1F2] text-[#1DA1F2]">Follow</div>
                </div>
                <div className="p-[15px] text-[#1DA1F2] text-[15px] font-normal">
                    Show more
                </div>            
            </motion.div>
            <p className="mt-[15px] font-normal text-[#8899A6] text-[13px]">Terms of Service Privacy Policy Cookie Policy Ads info More © 2021 Twitter, Inc.</p>
        </div>
    )
}

export default SearchBar;