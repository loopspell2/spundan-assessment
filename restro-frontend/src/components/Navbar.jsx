import React from 'react';

const Navbar = () => {

    const handleLogout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        window.location.href = '/auth';
      };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">
        My Menu
      </div>

      <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
