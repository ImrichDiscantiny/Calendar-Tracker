import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {Home} from './pages/Home/home';
import {CalendarMain} from './pages/Calendar/main-calendar';
import {StatsPage} from './pages/ActivityStats/statsPage';

import {Navbar} from './components/navbar';

function App() {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main className=" max-w-[1200px] mx-auto mt-[2rem]">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/timeline" element={<CalendarMain />}></Route>
          <Route path="/stats" element={<StatsPage />}></Route>
          <Route path="/user" element={<StatsPage />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
