import React, { useState } from "react";
import Sidebar from "./layout/sidebar.js";
import ProfileContent from "./profile/profileContent.js";
import SearchBar from "./search/searchBar.js";

function Profile(){
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
    
    return (
        <div className='flex bg-[#17202A]'>
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <ProfileContent setIsSidebarOpen={setIsSidebarOpen} />
          <SearchBar />
        </div>
    );
};

export default Profile;
