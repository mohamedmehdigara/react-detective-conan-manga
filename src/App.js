import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';

// --- 1. Global & Logic Styles ---
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@900&family=Sawarabi+Mincho&display=swap');
  
  body {
    background: #000;
    margin: 0;
    font-family: 'Sawarabi Mincho', serif;
    overflow: hidden;
    cursor: crosshair;
  }
`;

const drawLine = keyframes`
  from { stroke-dashoffset: 1000; }
  to { stroke-dashoffset: 0; }
`;

// --- 2. 3D & Layout Components ---
const Stage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1500px;
  background: radial-gradient(circle, #1a1a1a 0%, #000 100%);
`;

const MangaSheet = styled.main.attrs(props => ({
  style: {
    transform: `rotateY(${props.tiltX}deg) rotateX(${props.tiltY}deg)`,
  },
}))`
  background: #fdfdfd;
  width: 85vw;
  max-width: 900px;
  height: 80vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 15px;
  padding: 30px;
  position: relative;
  transition: transform 0.1s ease-out; /* Snappy for mouse tracking */
  box-shadow: 0 50px 100px rgba(0,0,0,0.9);
  direction: rtl;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: url("https://www.transparenttextures.com/patterns/natural-paper.png");
    opacity: 0.3;
    pointer-events: none;
    z-index: 5;
  }
`;

const Panel = styled.div`
  grid-column: ${props => props.cols || 'span 6'};
  grid-row: ${props => props.rows || 'span 4'};
  background: #fff;
  border: 4px solid #000;
  position: relative;
  z-index: 10;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  
  /* Dynamic Clip-Paths for Manga Style */
  clip-path: ${props => props.shape || 'none'};

  &:hover {
    z-index: 100;
    transform: translateZ(50px);
    box-shadow: 20px 20px 0px #e60012;
  }
`;

const ConnectionWire = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 20;

  path {
    stroke: #e60012;
    stroke-width: 3;
    fill: none;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ${drawLine} 2s forwards ease-in-out;
    filter: drop-shadow(0 0 5px rgba(230, 0, 18, 0.5));
  }
`;

const SFX = styled.div`
  position: absolute;
  font-family: 'Noto Serif JP', serif;
  font-size: ${props => props.size || '3rem'};
  color: #000;
  writing-mode: vertical-rl;
  right: 10px;
  top: 10px;
  -webkit-text-stroke: 1px white;
`;

// --- 3. The Logic Engine ---
export default function App() {
  const [tilt, setTilt] = useState({ x: -5, y: 2 });
  const [links, setLinks] = useState([]); // Tracks which red strings to show
  const [solved, setSolved] = useState(false);

  const handleMouseMove = (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (e.clientY - window.innerHeight / 2) / 25;
    setTilt({ x, y });
  };

  const connectClue = (id) => {
    if (!links.includes(id)) {
      setLinks([...links, id]);
      if (links.length + 1 >= 2) setSolved(true);
    }
  };

  return (
    <Stage onMouseMove={handleMouseMove}>
      <GlobalStyle />
      
      <div style={{ position: 'fixed', top: '30px', left: '30px', zIndex: 1000, color: '#fff' }}>
        <h2 style={{ letterSpacing: '5px' }}>DEDUCTION BOARD v11.0</h2>
        <p style={{ fontSize: '0.6rem', opacity: 0.5 }}>MOVE MOUSE TO INSPECT 3D SPACE</p>
      </div>

      <MangaSheet tiltX={tilt.x} tiltY={tilt.y}>
        {/* Red String Layer */}
        <ConnectionWire>
          {links.includes(1) && <path d="M 400 150 Q 500 300 300 450" />}
          {links.includes(2) && <path d="M 300 450 Q 150 500 600 650" />}
        </ConnectionWire>

        {/* Panel 1: The Victim */}
        <Panel cols="span 12" rows="span 3" style={{ background: '#000' }}>
          <h1 style={{ color: '#fff', fontSize: '3rem' }}>真実はいつもひとつ!</h1>
        </Panel>

        {/* Panel 2: The Footprints (Unlock String 1) */}
        <Panel 
          cols="span 7" rows="span 4" 
          shape="polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)"
          onClick={() => connectClue(1)}
        >
          <SFX size="4rem">ザワ</SFX>
          <p style={{ fontWeight: 900 }}>[ CLICK TO ANALYZE FOOTPRINTS ]</p>
          {links.includes(1) && <div style={{ color: '#e60012' }}>LINK ESTABLISHED</div>}
        </Panel>

        {/* Panel 3: The Secret (Unlock String 2) */}
        <Panel 
          cols="span 5" rows="span 4" 
          onClick={() => connectClue(2)}
        >
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <span style={{ fontSize: '3rem' }}>🗝️</span>
            <p style={{ fontSize: '0.8rem' }}>The hidden safe was empty...</p>
          </div>
        </Panel>

        {/* Panel 4: Conclusion */}
        <Panel cols="span 12" rows="span 3" style={{ background: solved ? '#e60012' : '#fff' }}>
          <h2 style={{ color: solved ? '#fff' : '#000' }}>
            {solved ? "THE CULPRIT'S IDENTITY REVEALED" : "CONNECT THE CLUES"}
          </h2>
          {solved && <SFX size="5rem" style={{ right: '40%' }}>バァーン</SFX>}
        </Panel>
      </MangaSheet>

      <footer style={{ position: 'fixed', bottom: '20px', right: '30px', opacity: 0.2, color: '#fff', fontSize: '0.6rem' }}>
        KUDO_LOGIC_V11.0
      </footer>
    </Stage>
  );
}