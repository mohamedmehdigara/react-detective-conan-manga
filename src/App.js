import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// 1. Manga Aesthetics: B&W, Screentones, and Right-to-Left
const GlobalMangaStyle = createGlobalStyle`
  body {
    background-color: #1a1a1a;
    margin: 0;
    font-family: "MS PMincho", "Sawarabi Mincho", serif;
    overflow-x: hidden;
  }
`;

// 2. The Manga Page Container
const MangaPage = styled.main`
  background: white;
  width: 100%;
  max-width: 900px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 40px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 200px;
  gap: 12px; /* The 'Gutter' */
  box-shadow: 0 0 50px rgba(0,0,0,0.5);
  direction: rtl; /* Traditional Manga Reading Flow */
`;

// 3. Panel Components with Halftone-style borders
const Panel = styled.div`
  background: #eee;
  border: 4px solid black;
  grid-column: ${props => props.col || 'span 4'};
  grid-row: ${props => props.row || 'span 1'};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Adding a subtle manga "screentone" effect */
  background-image: radial-gradient(#ccc 1px, transparent 0);
  background-size: 4px 4px;

  &:hover {
    background-color: #fff;
    filter: contrast(1.2);
  }
`;

const SpeechBubble = styled.div`
  position: absolute;
  background: white;
  border: 2px solid black;
  border-radius: 50%;
  padding: 10px;
  font-size: 0.9rem;
  font-weight: bold;
  color: black;
  max-width: 80px;
  text-align: center;
  top: ${props => props.top};
  right: ${props => props.right};
  box-shadow: 2px 2px 0px black;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: 20px;
    border-width: 10px 10px 0;
    border-style: solid;
    border-color: white transparent;
  }
`;

const SoundEffect = styled.div`
  position: absolute;
  font-family: 'Impact', sans-serif;
  font-size: 3rem;
  color: rgba(0,0,0,0.8);
  transform: rotate(-15deg);
  bottom: 10px;
  left: 10px;
  pointer-events: none;
`;

const PanelLabel = styled.span`
  background: black;
  color: white;
  padding: 2px 10px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.7rem;
`;

// 4. The Component
export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <GlobalMangaStyle />
      <div style={{ textAlign: 'center', color: 'white', padding: '10px' }}>
        <button onClick={() => setCurrentPage(p => p + 1)}>Next Chapter</button>
        <p>Reading Right → Left</p>
      </div>

      <MangaPage>
        {/* Panel 1: The Detective's Entry */}
        <Panel col="span 12" row="span 2">
          <PanelLabel>PANEL 01</PanelLabel>
          <h2 style={{ color: 'black', fontSize: '2.5rem' }}>EDOGAWA CONAN...</h2>
          <SoundEffect>THUMP!!</SoundEffect>
          <SpeechBubble top="20%" right="10%">There is only ONE truth!</SpeechBubble>
        </Panel>

        {/* Panel 2: The Clue */}
        <Panel col="span 6" row="span 2">
          <PanelLabel>PANEL 02</PanelLabel>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '4rem' }}>🔍</div>
            <p style={{ color: 'black' }}>Traces of potassium cyanide...</p>
          </div>
        </Panel>

        {/* Panel 3: Suspicion */}
        <Panel col="span 6" row="span 1">
          <PanelLabel>PANEL 03</PanelLabel>
          <SpeechBubble top="10%" right="5%">He's... just a kid?</SpeechBubble>
          <div style={{ fontSize: '3rem' }}>🤨</div>
        </Panel>

        {/* Panel 4: Action */}
        <Panel col="span 6" row="span 1">
          <PanelLabel>PANEL 04</PanelLabel>
          <SoundEffect style={{ fontSize: '1.5rem', color: 'red' }}>ZZZT!</SoundEffect>
          <p style={{ color: 'black' }}>*Aimed with Stun Gun Watch*</p>
        </Panel>

        {/* Panel 5: Conclusion */}
        <Panel col="span 12" row="span 1">
          <PanelLabel>FINAL PANEL</PanelLabel>
          <h3 style={{ color: 'black' }}>NEXT TIME: THE BLACK ORGANIZATION APPEARS...</h3>
        </Panel>
      </MangaPage>

      <footer style={{ height: '100px' }} />
    </>
  );
}