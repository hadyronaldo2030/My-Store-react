import React, { useEffect, useState } from 'react';
import './Navbar.css';
import TopNav from './TopNav';
import CenterNav from './CenterNav';
import BottomNav from './BottomNav';
import { UserProvider } from './../../../Context/UserContext';

export default function Navbar({ scrollableNodeRef }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navStyle, setNavStyle] = useState({ top: '0px' });

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef && scrollableNodeRef.current) {
        const currentScrollPos = scrollableNodeRef.current.scrollTop;

        if (currentScrollPos > scrollPosition) {
          // User is scrolling down (hide Navbar)
          setNavStyle({ top: '-180px' });
        } else {
          // User is scrolling up (show Navbar)
          setNavStyle({ top: '0px' });
        }

        setScrollPosition(currentScrollPos);
      }
    };

    const scrollNode = scrollableNodeRef.current;
    if (scrollNode) {
      scrollNode.addEventListener('scroll', handleScroll);
    }

    // Clean up the event listener on unmount
    return () => {
      if (scrollNode) {
        scrollNode.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollPosition, scrollableNodeRef]);

  return (
    <>
      <nav id='navbar' style={{ position: 'fixed', transition: 'top 1s', ...navStyle }}>
        <UserProvider>
          <TopNav />
          <hr style={{ border: '1px solid #414554', margin: 0 }} />
          <CenterNav />
        </UserProvider>
        <BottomNav />
      </nav>
      {/* fake navbar */}
      <div className='fake_navbar'></div>
    </>
  );
}
