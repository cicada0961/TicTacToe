import React, { useEffect } from 'react';
import './Intro.css';

function Intro({ onIntroEnd }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onIntroEnd();
    }, 3000); 
    return () => clearTimeout(timer);
  }, [onIntroEnd]);

  return (
    <div className="intro">
      <h1>TIC TAC TOE</h1>
      <p>Développé par Karim Makhlouf</p>
    </div>
  );
}

export default Intro;
