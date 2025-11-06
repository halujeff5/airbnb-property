import React, { useState, useEffect } from 'react';
import './App.css'
import Header from './Header';
import ReviewsCard from './ReviewsCard';
import ReviewsDefault from './ReviewsDefault'

type Review = {
    username: string;
    review: string;
  };

export const Reviews = () => {
    const [entries, setEntries] = useState<Review[] | null>([]);
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    if (!entries) return null;

    async function getReviews() {
 
    let res = await fetch(`http://localhost:4242/review`);
    const data = await res.json()
    setEntries(data.rev)
    setLoading(true)
        }
    
    useEffect(() => 
        {
            getReviews()
        }, [setLoading]
    )

    const handleSubmit = async (e: any) => { 
        e.preventDefault();
        console.log({name, message});
        try {
        const res = await fetch(`http://localhost:4242/review?username=${name}&review=${message}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
        }
        
    )} catch(e) {
        console.log(e)
    }   await getReviews()
        setName('')
        setMessage('')
    }

    function handleChangeName(e: any) {
        e.preventDefault();
        setName(e.target.value)
    }

    function handleChangeMessage(e: any ) {
        e.preventDefault();
        setMessage(e.target.value)
    }


    return (
        <div className='header-1'>
        <Header />
        <h3 className='text-title'>Black Diamond Escape Reviews</h3>
        <ReviewsDefault />
        {entries.map((n) => (
             <ReviewsCard 
                username = {n.username}
                reviews = {n.review}
                />
        ))}
       

        <h2 className= 'text-title'>Drop a Review</h2>

<form onSubmit={handleSubmit} >
        <div style={{ display: "flex", flexDirection: "column",  }}> 
        <input id='name' type = 'text' value= {name} onChange = {handleChangeName} placeholder = 'Enter name' required style ={{padding : '15px',
        border: '1px solid white', backgroundColor: 'beige', borderRadius: '6px', color: 'black'
    }}/>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
        <textarea
          id="message"
          value={message}
          onChange={handleChangeMessage}
          placeholder="Leave review..."
          rows={5} required
          style={{
            padding: "15px",
            marginTop: '10px',
            border: "1px solid white",
            backgroundColor: 'beige',
            borderRadius: "6px",
            marginBottom: '120px',
            color: 'black'}}/>
        </div> 
            <button type='submit' 
        //   onClick = {getReviews}
          style={{ padding: "0.6rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: 500,
          position: 'relative',
          bottom: '100px',
          marginBottom: '50px'
        }}>Submit</button>

</form>
        </div>)

};