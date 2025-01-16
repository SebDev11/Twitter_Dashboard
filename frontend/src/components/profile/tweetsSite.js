import React, { useContext } from "react";
import { motion } from "framer-motion";

function TweetsSite({items}) {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-2.5 px-[15px] border !border-[#3A444C]"
        >
            {items && items.map((item) => (
                <div className="flex" key={item._id}>
                    <img className='w-[49px] h-[49px]' src="./image/devon.png" alt='' />
                    <div className="ml-2.5 grow">
                        <p className='font-normal text-[15px] text-white'>{item.user[0].username} <span className="text-[#8899A6]">@{item.user[0].email.split('@')[0]}·23s</span></p>
                        <p className='font-normal text-[15px] text-white'>{item.item}</p>
                        <div className="py-2.5">
                            <img src={`./uploads/${item.itemImage}`} alt="ItemImage" className="w-full" />
                        </div>
                        <div className="grid grid-cols-4 gap-4 py-1 font-normal text-[13px] text-[#8899A6]">
                            {/* <div className="flex" onClick={() => {user.user && user.user._id !== data.userId && setShowBar(data._id)}}> */}
                            <div className="flex">
                                <img src="./image/comment.png" className="w-[18px] h-[18px]" />
                                <p className="ml-2.5">{item.comments.length}</p>
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
            )) }        
        </motion.div>
    )
}

export default TweetsSite;