import React, { useState } from "react";
import Sidebar from "./layout/sidebar.js";
import ProfileContent from "./profile/profileContent.js";
import SearchBar from "./search/searchBar.js";
import ProfileEditModal from "./profile/editModal.js";

function Profile(){
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
    const [ editModalOpen, setEditModalOpen ] = useState(false);
    console.log(editModalOpen)
    return (
        <div className='flex bg-[#17202A]'>
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <ProfileContent setIsSidebarOpen={setIsSidebarOpen} editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} />
          <SearchBar />
          { editModalOpen && <ProfileEditModal setEditModalOpen={setEditModalOpen} /> }
        </div>
    );
};

export default Profile;
