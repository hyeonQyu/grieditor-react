import React from 'react';
import { Tableditor } from '@components/tableditor';
import { Global } from '@emotion/react';
import { RESET_STYLE } from '@styles/reset';

function App() {
  return (
    <>
      <Global styles={[RESET_STYLE]} />
      <Tableditor />
    </>
  );
}

export default App;
