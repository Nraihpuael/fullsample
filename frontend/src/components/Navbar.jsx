import React from 'react';
import Logo from '../assets/logo/Logo.svg';
import Button from './ui/Button';
import '../styles/components/navbar.css';
import UserMenu from './UserMenu';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <div className='container'>
      <nav className='navbar'>
  <div className='navbar-left'>
    <a href='/'>
      <img src={Logo} alt='logo-icon' />
    </a>
    <div className='navbar-links'>
      {isAuthenticated() && (
        <>
          <Button asLink href='/notes' className='nav-link'>My Notes</Button>   
          <Button asLink href='/categories' className='nav-link'>My Categories</Button>    
          <Button asLink href='/archived' className='nav-link'>Archived</Button>         
        </>
      )}
    </div>
  </div>

  <div className='navbar-right'>
    {isAuthenticated() ? <UserMenu /> : <Button asLink href='/auth/login' className='authLogin'>Login</Button>}
  </div>
</nav>

    </div>
  );
};

export default Navbar;
