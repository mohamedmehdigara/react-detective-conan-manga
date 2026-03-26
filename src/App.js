import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';

// --- 1. Stress & Heartbeat FX ---
const heartbeat = keyframes`
  0% { transform: scale(1); filter: drop-shadow(0 0 0px #e60012); }
  15% { transform: scale(1.02); filter: drop-shadow(0 0 20px #e60012); }
  30% { transform: scale(1); filter: drop-shadow(0 0 5px #e60012); }
  45% { transform: scale(1.01); filter: drop-shadow(0 0 10px #e60012); }
  100% { transform: scale(1); }
`;

const drift = keyframes`
  from { transform: translateY(0) rotate(0deg); opacity: 0; }
  50% { opacity: 0.4; }
  to { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
`;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@900&family=Shadows+Into+Light&display=swap');
  
  body {
    background: #000;
    margin: 0;
    font-family: 'Sawarabi Mincho', serif;
    overflow: hidden;
    color: #fff;
    cursor: crosshair;
  }
`;

// --- 2. Advanced 3D & Stress Components ---
const Stage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1500px;
  background: radial-gradient(circle at center, #111 0%, #000 100%);
`;

const Particle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #fff;
  opacity: 0.1;
  bottom: -10px;
  left: ${props => props.left}%;
  animation: ${drift} ${props => props.speed}s linear infinite;
  pointer-events: none;
`;

const OcularOverlay = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1000;
  background: radial-gradient(circle at center, transparent ${props => 100 - (props.clues * 25)}%, rgba(0,0,0,0.9) 100%);
  transition: background 1s ease;
`;

const MangaSheet = styled.main`
  background: #fdfdfd;
  width: 80vw;
  max-width: 800px;
  height: 80vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 15px;
  padding: 40px;
  position: relative;
  transform: rotateY(-5deg) rotateX(2deg);
  box-shadow: 0 50px 100px rgba(0,0,0,0.9);
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  direction: rtl;

  &:hover { transform: rotateY(0deg) rotateX(0deg); }
`;

const Panel = styled.div`
  grid-column: ${props => props.cols || 'span 6'};
  grid-row: ${props => props.rows || 'span 4'};
  background: #fff;
  border: 4px solid #000;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  
  ${props => props.isCulprit && css`
    &:hover {
      animation: ${heartbeat} 0.8s infinite;
      border-color: #e60012;
      z-index: 100;
      transform: scale(1.1) translateZ(100px);
    }
  `}

  &:hover:not([isCulprit]) {
    z-index: 50;
    transform: translateZ(50px);
  }
`;

const SFX = styled.div`
  position: absolute;
  font-family: 'Noto Serif JP', serif;
  font-size: 3.5rem;
  color: #000;
  writing-mode: vertical-rl;
  right: 15px;
  top: 15px;
  pointer-events: none;
  -webkit-text-stroke: 1.5px white;
`;

// --- 3. The Logic Engine ---
export default function App() {
  const [clues, setClues] = useState(0);
  const [isSolved, setIsSolved] = useState(false);

  return (
    <Stage>
      <GlobalStyle />
      <OcularOverlay clues={clues} />
      
      {/* Parallax Particles */}
      {[...Array(20)].map((_, i) => (
        <Particle key={i} left={Math.random() * 100} speed={5 + Math.random() * 10} />
      ))}

      <div style={{ position: 'fixed', top: '30px', left: '30px', zIndex: 2000 }}>
        <h2 style={{ letterSpacing: '5px', color: clues >= 3 ? '#e60012' : '#fff' }}>
          {clues >= 3 ? "ACCUSATION READY" : "INVESTIGATION PHASE"}
        </h2>
        <p style={{ fontSize: '0.6rem', opacity: 0.5 }}>FOCUSING ON THE TRUTH: {clues * 33}%</p>
      </div>

      <MangaSheet>
        <Panel cols="span 12" rows="span 3" style={{ background: '#000', color: '#fff' }}>
          <h1 style={{ fontSize: '3rem', margin: 0 }}>名探偵コナン</h1>
          <SFX x="5%" y="5%">ドドド</SFX>
        </Panel>

        <Panel cols="span 7" rows="span 5" onClick={() => setClues(c => Math.min(c + 1, 3))}>
          <div style={{ padding: '20px', color: '#000', textAlign: 'center' }}>
            <h3 style={{ textDecoration: 'underline' }}>WITNESS STATEMENT</h3>
            <p>"The suspect was wearing a blue coat, but the reflection in the puddle was red..."</p>
          </div>
          <SFX size="2rem" x="10%" y="10%">ザワ</SFX>
        </Panel>

        <Panel cols="span 5" rows="span 3" isCulprit={clues >= 2} onClick={() => clues >= 3 && setIsSolved(true)}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '4rem' }}>👤</span>
            <p style={{ color: '#000', fontSize: '0.7rem' }}>
              {clues >= 3 ? "POINT OUT THE CULPRIT" : "????"}
            </p>
          </div>
        </Panel>

        <Panel cols="span 5" rows="span 2" onClick={() => setClues(c => Math.min(c + 1, 3))}>
          <div style={{ fontSize: '2rem' }}>👔</div>
          <p style={{ color: '#000', fontSize: '0.6rem' }}>CLUE: DISCARDED TIE</p>
        </Panel>

        {isSolved && (
          <div style={{
            position: 'absolute', inset: 0, background: '#e60012', zIndex: 1000,
            display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff'
          }}>
            <h1 style={{ fontSize: '5rem', textAlign: 'center' }}>
              犯人はお前だ!<br/>
              <span style={{ fontSize: '1.5rem' }}>(It was you!)</span>
            </h1>
          </div>
        )}
      </MangaSheet>

      <footer style={{ position: 'fixed', bottom: '20px', right: '30px', opacity: 0.3, fontSize: '0.6rem' }}>
        HEARTBEAT_V16.0 // OCULAR_LENS_ACTIVE
      </footer>
    </Stage>
  );
}