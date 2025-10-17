import React from 'react';
import './App.css';

export default function ReviewsCard({ username, reviews }) {

    return (
        <>
            <div className='review-text'>
                {reviews}  -{username}
            </div>
        </>
    )
}