import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';

// --- 1. Animations & Shaders ---
const inkGrit = keyframes`
  0% { transform: translate(0,0) }
  10% { transform: translate(-0.5%, -0.5%) }
  20% { transform: translate(0.5%, 0.5%) }
  100% { transform: translate(0,0) }
`;

const deductionFlash = keyframes`
  0% { filter: contrast(1) brightness(1); }
  10% { filter: contrast(5) brightness(2) invert(1); }
  100% { filter: contrast(1.2) brightness(1.1); }
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@900&family=Sawarabi+Mincho&display=swap');
  
  body {
    background-color: #050505;
    margin: 0;
    font-family: 'Sawarabi Mincho', serif;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }
`;

// --- 2. The Manga Architecture ---
const Desk = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, #1a1a1a 0%, #000 100%);
  perspective: 1500px;
`;

const MangaPage = styled.main`
  background: #fdfdfd;
  width: 90%;
  max-width: 800px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(110px, auto);
  gap: 12px;
  padding: 30px;
  direction: rtl; 
  position: relative;
  box-shadow: 0 50px 100px rgba(0,0,0,0.9);
  transition: transform 0.2s ease-out;
  transform: ${props => `rotateX(${props.tilt.y}deg) rotateY(${props.tilt.x}deg)`};
  animation: ${props => props.isSolved ? css`${deductionFlash} 0.8s ease-out forwards` : 'none'};

  /* Physical Paper Shader */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: 
      url("https://www.transparenttextures.com/patterns/natural-paper.png"),
      radial-gradient(rgba(0,0,0,0.12) 1.2px, transparent 0);
    background-size: auto, 4px 4px;
    pointer-events: none;
    z-index: 10;
  }
`;

const Panel = styled.div`
  grid-column: ${props => props.cols || 'span 6'};
  grid-row: ${props => props.rows || 'span 2'};
  background: #fff;
  border: 4px solid #000;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  /* Organic Border - Not perfectly straight */
  border-radius: 2px 5px 3px 6px;

  &:hover {
    z-index: 50;
    transform: scale(1.04) translateZ(40px);
    box-shadow: 15px 15px 0px #e60012;
    border-color: #000;
  }
`;

const SFX = styled.div`
  position: absolute;
  font-family: 'Noto Serif JP', serif;
  font-size: ${props => props.size || '4rem'};
  color: ${props => props.red ? '#e60012' : '#000'};
  writing-mode: vertical-rl;
  right: ${props => props.x || '5%'};
  bottom: ${props => props.bottom || '10%'};
  z-index: 20;
  -webkit-text-stroke: 1.5px #fff;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  pointer-events: none;
  font-weight: 900;
`;

const ThoughtBubble = styled.div`
  position: absolute;
  background: #fff;
  border: 2px solid #000;
  padding: 10px;
  font-size: 0.8rem;
  font-weight: 900;
  color: #000;
  top: ${props => props.y};
  right: ${props => props.x};
  box-shadow: 3px 3px 0px #000;
  z-index: 30;
  max-width: 130px;
  border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
  mix-blend-mode: multiply; /* Inks the text into the paper */
`;

const Mask = styled.div`
  position: absolute;
  inset: 0;
  background: #000;
  z-index: 100;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  letter-spacing: 4px;
  cursor: help;
  transition: opacity 0.6s ease, transform 0.6s ease;
  ${props => props.open && css`
    opacity: 0;
    transform: translateY(-100%);
    pointer-events: none;
  `}
`;

// --- 3. The Logic Engine ---
export default function App() {
  const [evidence, setEvidence] = useState({ one: false, two: false, three: false });
  const [tilt, setTilt] = useState({ x: -5, y: 2 });
  const isSolved = Object.values(evidence).every(Boolean);

  const handleMouseMove = (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;
    setTilt({ x: x - 5, y: y + 2 });
  };

  return (
    <Desk onMouseMove={handleMouseMove}>
      <GlobalStyle />
      
      {/* HUD Info */}
      <div style={{ position: 'fixed', top: '30px', left: '30px', zIndex: 200, color: '#fff' }}>
        <h2 style={{ letterSpacing: '8px', margin: 0, fontSize: '1rem' }}>名探偵コナン</h2>
        <p style={{ fontSize: '0.6rem', opacity: 0.5 }}>STATUS: {isSolved ? "TRUTH ATTAINED" : "DEDUCING..."}</p>
      </div>

      <MangaPage tilt={tilt} isSolved={isSolved}>
        {/* Panel 1: The Intro */}
        <Panel cols="span 12" rows="span 4">
          <div style={{ 
            background: isSolved ? '#e60012' : '#000', 
            color: '#fff', padding: '40px', height: '100%', 
            transition: 'background 1s cubic-bezier(0.4, 0, 0.2, 1)' 
          }}>
            <h1 style={{ fontSize: '3.5rem', margin: 0 }}>真相はいつもひとつ!</h1>
            <p style={{ opacity: 0.7 }}>THERE IS ALWAYS ONLY ONE TRUTH!</p>
          </div>
          <SFX x="5%" bottom="10%" size="6rem">ドドド</SFX>
        </Panel>

        {/* Panel 2: The Clue (Interactive) */}
        <Panel cols="span 5" rows="span 5">
          <Mask open={evidence.one} onClick={() => setEvidence({...evidence, one: true})}>
            [ CLASSIFIED ]
          </Mask>
          <div style={{ padding: '20px', textAlign: 'center', marginTop: '40px' }}>
            <span style={{ fontSize: '4rem' }}>🕵️‍♂️</span>
            <p style={{ color: '#000', fontWeight: '900', fontSize: '0.9rem' }}>"The shadow... it moves against the wind."</p>
          </div>
          <ThoughtBubble x="10%" y="10%">Something is off.</ThoughtBubble>
        </Panel>

        {/* Panel 3: Gadget Logic */}
        <Panel cols="span 7" rows="span 3" onClick={() => setEvidence({...evidence, two: true})} style={{ cursor: 'pointer' }}>
          <div style={{ padding: '25px', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '3rem', filter: evidence.two ? 'none' : 'grayscale(1) blur(4px)' }}>🎯</span>
            <div style={{ marginLeft: '15px', color: '#000' }}>
               <h3 style={{ margin: 0 }}>TARGET LOCK</h3>
               <p style={{ fontSize: '0.7rem' }}>Stun-gun watch: Calibrating...</p>
            </div>
          </div>
          <SFX red x="5%" bottom="5%" size="2rem">ザワ</SFX>
        </Panel>

        {/* Panel 4: The Final Evidence */}
        <Panel cols="span 7" rows="span 2" onClick={() => setEvidence({...evidence, three: true})} style={{ cursor: 'pointer' }}>
           <Mask open={evidence.three}>
            [ ANALYSIS ]
          </Mask>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <span style={{ fontSize: '3rem' }}>💊</span>
            <h4 style={{ color: '#000', marginLeft: '15px', letterSpacing: '2px' }}>APTX 4869 FOUND</h4>
          </div>
        </Panel>

        {/* Panel 5: The Reveal */}
        <Panel cols="span 12" rows="span 3" style={{ background: isSolved ? '#000' : '#fff' }}>
          <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: isSolved ? '#e60012' : '#ddd', textAlign: 'center' }}>
              {isSolved ? "CASE CLOSED!" : "COLLECTING PROOF..."}
            </h2>
          </div>
          {isSolved && <SFX red x="45%" bottom="10%" size="6rem">バァーン</SFX>}
        </Panel>
      </MangaPage>

      <footer style={{ position: 'fixed', bottom: '20px', opacity: 0.3, color: '#fff', fontSize: '0.6rem', letterSpacing: '3px' }}>
        RE-RENDER: REACT_MANGA_CORE_V3
      </footer>
    </Desk>
  );
}