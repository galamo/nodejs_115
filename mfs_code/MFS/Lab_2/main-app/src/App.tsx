import React from 'react';
import { Test } from 'shared-lib';
import { CountryData } from 'country-data';
let show = true;
function App() {
  return (
    <div style={{ fontFamily: 'Arial' }}>
      <h1>Main Application</h1>
      {show ? <Test /> : null}
      <CountryData />
    </div>
  );
}

export default App;
