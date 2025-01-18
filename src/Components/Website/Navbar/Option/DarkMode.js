import React, { useEffect, useState } from 'react';

export default function DarkMode() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'lightMode');

    useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
  
      const btnLight = document.querySelector('.themeicon.btnLight');
      const faMoon = document.querySelector('.themeicon.fa-moon');
  
      if (btnLight && faMoon) {
        if (theme === 'darkMode') {
          btnLight.classList.add('d-none');
          faMoon.classList.remove('d-none');
          faMoon.classList.add('fa-bounce');
          setTimeout(() => {
            faMoon.classList.remove('fa-bounce');
          }, 1000);
        } else if (theme === 'lightMode') {
          faMoon.classList.add('d-none');
          btnLight.classList.remove('d-none');
          btnLight.classList.add('fa-bounce');
          setTimeout(() => {
            btnLight.classList.remove('fa-bounce');
          }, 1000);
        }
      }
  
      localStorage.setItem('theme', theme);
    }, [theme]);
  
    const handleThemeToggle = () => {
      setTheme((prevTheme) => (prevTheme === 'darkMode' ? 'lightMode' : 'darkMode'));
    };
  

  return ( 
    <button class="icon-fs-xl themeicons" onClick={handleThemeToggle}>
        <i class="fa-thin fa-sun-bright themeicon btnLight"></i>
        <i class="fa-thin fa-moon themeicon fa-bounce d-none"></i>
    </button>
  );
}

