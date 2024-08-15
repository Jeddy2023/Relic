import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const UserLayout: React.FC = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="custom-font-jakarta dashboard flex bg-[rgb(248, 248, 248)] max-w-[1700px] m-0 mx-auto">
      <div className={`max-w-[255px] bg-white ease-in-out duration-300 border border-l-4`}>

      </div>
      <div className="w-full">
        <div className="flex justify-center w-full sticky top-0 bg-white z-30">
          
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
