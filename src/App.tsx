import React from 'react';
import { Grieditor } from '@components/grieditor';
import { Global } from '@emotion/react';
import { RESET_STYLE } from '@styles/reset';

function App() {
  return (
    <>
      <Global styles={[RESET_STYLE]} />
      <Grieditor />
    </>
  );
}

export default App;
