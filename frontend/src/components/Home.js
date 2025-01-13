import React, {useState} from "react";
import Sidebar from "./layout/sidebar.js";
import MainContent from "./main/mainContent.js";
import SearchBar from "./search/searchBar.js";

function Home(){
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false)
    return (
        <div className='flex bg-[#17202A]'>
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <MainContent setIsSidebarOpen={setIsSidebarOpen} />
          <SearchBar />
          {/* <div className="grid grid-cols-7">
            <div className="col-span-7 lg:col-span-5">
              <MainContent />
            </div>
            <div className="lg:col-span-2">
              <SearchBar />
            </div>
          </div> */}
        </div>
    );
};

export default Home;
