import React, { useState } from "react";
import { motion } from 'framer-motion';

function Navbar({pageTitle, setIsSidebarOpen}) {

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div 
                className='pt-[15px] flex justify-between items-center mb-6 lg:hidden'
                onClick={() => setIsSidebarOpen(true)}
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className='font-lufga text-white'
                >
                    <img src={"./image/hamburger.svg"} alt='' />
                </motion.button>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className='w-full flex justify-between'
            >
                <div className='flex gap-2 items-center'>
                    {pageTitle && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className={`font-lufga text-white`}
                        >
                            {pageTitle}
                        </motion.div>
                    )}
                </div>
                <img src="./image/topTweet.png" className="w-6 h-6" />
            </motion.div>
        </motion.div>
    )
}

export default Navbar