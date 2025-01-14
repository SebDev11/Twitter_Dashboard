import React, { useContext } from "react";
import SidebarItem from "./sidebarItem";
import { UserContext } from "../../provider/userProvider";
import { useNavigate } from "react-router-dom";
import { navLinks } from "../../constant/constant";

function Sidebar({isSidebarOpen}){
    const authData = useContext(UserContext);
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }

    return (
        <div className={`bg-[#17202A] absolute transition-transform duration-300 z-30 lg:relative ${isSidebarOpen ? 'translate-x-0 shadow-custom' : '-translate-x-full lg:translate-x-0'}`}>
            <div className={`w-[275px] px-2.5 flex-col justify-between flex h-screen ${!isSidebarOpen && "ml-[88px]" } `}>
                <div className=''>
                    <div className={`px-2.5 items-center h-[53px] flex`}>
                        <div className="w-[30px] h-[30px] border-white items-center flex justify-center">
                            <img src={'./image/Logo.png'} />
                        </div>
                    </div>
                    <div>
                    {navLinks.map((item) => (
                        <SidebarItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            url={item.url}
                            src={item.icon}
                            style={item.style}
                        />
                    ))}
                    </div>
                    <div className="mt-[15px] h-[49px] w-[229px] rounded-full bg-[#1DA1F2] items-center flex justify-center text-[15px] font-normal text-white">Tweet</div>
                </div>
                <div className='flex justify-between px-2.5 h-[69px] items-center' onClick={handleLogout}>
                    <div className="flex">
                        <div className="w-[39px] h-[39px]">
                            <img className='' src="./image/avatar.png" alt='' />
                        </div>
                        <div className="ml-5">
                            <p className='font-normal text-4 text-white'>{authData.user && authData.user.username}</p>
                            <p className='font-normal text-4 text-[#8899A6]'>@{authData.user && authData.user.email.split('@')[0]}</p>
                        </div>  
                    </div>
                    <img src="./image/hori.png" className="h-1" />       
                </div>
            </div>
        </div>
    )
}

export default Sidebar