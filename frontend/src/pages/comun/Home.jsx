import React, { useEffect } from 'react';
import Button from '../../components/ui/Button';
import HeroBg from '../../assets/bg.jpg';
import '../../styles/pages/homePage.css';
import { Skeleton } from '../../components/ui/Skeleton';
import useAuthStore from '../../store/authStore';

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  return (
    <main className='home-main'>
      <section className='hero-section'>
        <div className='hero-bg'>
          <img src={HeroBg} alt='backgroundImage' />
        </div>
        <div className='hero-content'>
          <h1 className='hero-title'>Write, Remember, Cherish</h1>
            <p className='hero-description'>
              Keep what truly matters to you. Join BrightSketches today and let your memories shine.
            </p>
          <div className='hero-buttons'>
            {isAuthenticated() ? (
              ''
            ) : (
              <Button
                asLink
                href='/auth/register'
                className='register-button-home'
              >
                Join
              </Button>
            )}
            
          </div>
        </div>
      </section>

      
    </main>
  );
}
