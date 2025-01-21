import React, { useEffect, useState } from 'react';
import '../styles/components/userMenu.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useAuthStore from '../store/authStore';

const UserMenu = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [openMenu, setOpenMenu] = useState(false);

  

  const handleChange = () => {
    setOpenMenu(!openMenu);
  };

  const handleLogout = () => {
    logout();
    toast.success('Session closed successfully');
    navigate('/auth/login');
  };


  return (
    <div className='userMenu'>
      <button onClick={handleChange} className='userProfile'>
        In
      </button>
      {openMenu && (
        <div className='menu'>                  
          <button onClick={handleLogout} className='menuLogout'>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
