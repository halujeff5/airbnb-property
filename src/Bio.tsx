import React from 'react';
import './App.css'
import Header from './Header'
import CustomCarousel from './CustomCarousel';


export default function Bio() {
    return (
        <>
            <Header />
            <h1>Gallery</h1>
            <div className='photos'>
                <CustomCarousel />
            </div>
            <h2 className='gallery-dialog'>
                Welcome to Black Diamond Escape - a charming 3 bedroom, 2 bathroom rental for your Catskill Mountain getaway offering breathtaking views of the great outdoors! It's recently renovated, equipped with modern amenities including self check-in, a standing desk to work from home, game room with nostalgic arcade games and a fully stocked coffee bar. Situated less than 5 miles from Plattekill Mountain and nearby many local attractions, it’s an amazing escape exploring all that the area has to offer.
            </h2>
        </>
    )
}