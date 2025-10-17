import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import BasicDateCalendar from './BasicDateCalendar';
import Bio from './Bio';
import Stripe from './Stripe';
import { Reviews } from './Reviews';


function App() {


  return (

    <Routes>
      <Route path = '/' element={<BasicDateCalendar />} />
      <Route path = '/bio' element = {<Bio />} />
      <Route path = '/reservation' element = {<Stripe />} />
      <Route path = '/reviews' element = {<Reviews />} />
    
    </Routes>

  )
}

export default App;
