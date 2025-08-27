import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InputData } from './components/InputData';
import { Test } from './components/Test';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<InputData />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
