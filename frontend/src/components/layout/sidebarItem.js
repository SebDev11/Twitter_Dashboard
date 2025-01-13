import React, { useState } from "react";


function SidebarItem({title, src, style}) {

    return (
        <div className={`pl-2.5 items-center h-[60px] flex`}>
            <div className="w-[30px] h-[30px] items-center flex justify-center">
                <img src={src} />
            </div>
            <p className={` ml-5 text-[19px] font-normal leading-normal ${style ? style : "text-white"}`}>{title}</p>
        </div>
    )
}

export default SidebarItem