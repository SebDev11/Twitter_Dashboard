import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SidebarItem({title, url, src, style}) {
    const navigate = useNavigate()
    const [ item, setItem ] = useState('')
    return (
        <div className={`pl-2.5 items-center h-[60px] flex`} onClick={() => {
            navigate(url)
            setItem(title)
        }}>
            <div className={`w-[30px] h-[30px] items-center flex justify-center ${item == title ? "text-[#1DA1F2]" : ''}`}>
                <img src={src} />
            </div>
            <p className={` ml-5 text-[19px] font-normal leading-normal ${style ? style : "text-white"}`}>{title}</p>
        </div>
    )
}

export default SidebarItem