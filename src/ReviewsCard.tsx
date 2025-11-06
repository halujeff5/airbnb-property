import React from 'react';
import './App.css';

export default function ReviewsCard({ username, reviews}: any) {

    return (
        <>
            <div className='review-text'>
                {reviews}  -{username}
            </div>
        </>
    )
}