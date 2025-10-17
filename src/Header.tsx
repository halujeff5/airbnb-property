import React from 'react'
import './App.css'
import mainPic from './exterior.jpg'
import FoundationIcon from '@mui/icons-material/Foundation';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


export default function Header() {
    return (
        <>
        <div className = 'icons'>
            <a href = '/'><FoundationIcon sx={{fontSize: 33}} /></a>
        </div>
            <div className='icons'>
                <a href = '/bio'><CollectionsOutlinedIcon sx={{fontSize: 33}}/></a>
            </div>
            <div className='icons'>
                <a href = '/reviews'><ReviewsOutlinedIcon sx={{fontSize: 33}}/></a>
            </div>
            <div className= 'icons'>
                <MailOutlineIcon sx={{fontSize:33}}/>
            </div>

        </>
    )
}