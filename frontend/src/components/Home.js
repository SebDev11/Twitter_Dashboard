import React, {useState, useEffect, createContext} from "react";
import axios from "axios";
import Sidebar from "./layout/sidebar.js";
import MainContent from "./main/mainContent.js";
import SearchBar from "./search/searchBar.js";

function Home(){
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
    
    return (
        <div className='flex bg-[#17202A]'>
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <MainContent setIsSidebarOpen={setIsSidebarOpen} />
          <SearchBar />
        </div>
    );
};

export default Home;
