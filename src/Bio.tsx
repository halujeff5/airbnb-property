import React from 'react';
import './App.css'
import Header from './Header'
import house from './assets/exterior.jpg'
import backyard from './assets/backyard.jpg'
import bedroom from './assets/bedroom.jpg'
import bedroom1 from './assets/bedroom1.jpg'
import wall from './assets/bio-pic.jpg'
import diningroom from './assets/diningroom.jpg'
import foyer from './assets/foyer.jpg'
import nature2 from './assets/nature2.jpg'
import patio from './assets/patio.jpg'
import patio1 from './assets/patio1.jpg'
import towels from './assets/towels.jpg'

export default function Bio() {

    return (
        <>
        <Header />
        <h1>Gallery</h1>
        <div className='photos'>
        <img src = {house} alt='house'/>
        <img src = {bedroom} alt='bedroom'/>
        <img src = {bedroom1} alt='bedroom1' />
        </div>
        <h2>
            Welcome to Black Diamond Escape - a charming 3 bedroom, 2 bathroom rental for your Catskill Mountain getaway offering breathtaking views of the great outdoors! It's recently renovated, equipped with modern amenities including self check-in, a standing desk to work from home, game room with nostalgic arcade games and a fully stocked coffee bar. Situated less than 5 miles from Plattekill Mountain and nearby many local attractions, it’s an amazing escape exploring all that the area has to offer.
        </h2>
        <div className= 'bottom-gallery'>
        <img src = {wall} alt= 'wall' />
        <img src = {diningroom} alt = 'diningroom' />
        <img src = {foyer} alt = 'foyer' />
        </div>

        </>

    )
}