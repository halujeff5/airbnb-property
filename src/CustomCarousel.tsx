import React, {useState} from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import exterior from '/src/assets/exterior.jpg';
import bedroom from '/src/assets/bedroom.jpg';
import bedroom1 from '/src/assets/bedroom1.jpg'
import house from '/src/assets/bio-pic.jpg'
import diningroom from '/src/assets/diningroom.jpg';
import foyer from '/src/assets/foyer.jpg';
import nature2 from '/src/assets/nature2.jpg'
import patio from '/src/assets/patio.jpg'
import patio1 from '/src/assets/patio1.jpg'
import towels from '/src/assets/towels.jpg'
import backyard from  '/src/assets/backyard.jpg' 

const images = [
`${exterior}`,`${bedroom}`, `${bedroom1}`, `${house}`, `${diningroom}`, `${foyer}`, `${nature2}`, `${patio}`, `${patio1}`, `${towels}`, `${backyard}`
]

export default function CustomCarousel() {
    const [index, setIndex] = useState(0); 
    const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

    return (

        <Box position= "relative" margin='auto' >
            <img
            loading= 'lazy'
        src= {images[index]}
        alt={`slide-${index}`}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",

        }}
      />
      <IconButton
        onClick={prev}
        sx={{ position: "absolute", top: "50%", left: "10px", color: "white" }}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        onClick={next}
        sx={{ position: "absolute", top: "50%", right: "10px", color: "white" }}
      >
        <ArrowForwardIos />
      </IconButton>
      <Box
        sx={{
          position: "absolute",
          bottom: 15,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {images.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: index === i ? 12 : 8,
              height: index === i ? 12 : 8,
              borderRadius: "50%",
              backgroundColor: index === i ? "white" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          />
        ))}
      </Box>

        </Box>
    )
};
