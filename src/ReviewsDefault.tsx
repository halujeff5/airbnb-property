import React from 'react';
import './App.css'


const reviewsList ={'Justin' : 'Awesome features like retro games . House is very clean and bathrooms kept nice and clean.', 'Hailey': 'We had a great stay! It was clean and exactly like the pictures. The mountains nearby are beautiful to drive through. Definitely would stay again if we are back!', 'SuzanneMontana20' : 'Great proximity to Belleayre mtn. Beautiful Home. Game room was very cool! Only negative was no dryer. It rained on the mtn and our clothes were soaked. There was no wood either. We had to run out to get wood and the rotate our clothes to dry so we could hit the mtn the next day.', 'David' : "My family had a wonderful stay at Gina's. Even though it was kind of cold on the first floor, the rooms were warm and the beds were comfortable. The kids thoroughly enjoyed the game room and enjoyed the board games as well! Gina was very responsive to any of my questions or concerns I had.", 'Jennifer' : `We had such a fun time! When not on the mountain, we watched movies and played games. This place is great for teens! Spacious. Quiet for the adults :)
`, 'Victoria' : 'Cute place. Liked how it was decorated. Games were fun and unique. Easy to reach host and very responsive. Would definitely stay again.', 'Greg' : 'Nice place to stay for the night!', 'Steph': 'Only stayed for one night but it was great value and super close to Plattekill mountain for snowboarding! Host provides lots of amenities in the home. A nice place to stay with a group of friends.', 

'Jian': 'Overall a clean place and was ok. did have a very dirty pot. Very creaky bunk bed. no instructions on using the furnace. Maybe a lighter or something to split the wood would be helpful. Also someone had setup an alarm at 6am waking up most of us.', 

'Meghan' : 'We loved our stay at Gina’s place. Everything was exactly as listed. Only downside was that it was too cold to use the downstairs. But it was also only 5 degrees outside, so it’s understandable. The kids loved the video games, and there was room for them to go sledding. Will definitely be back!', 

'Rebecca': 'Great location to the mountains and a beautiful, clean house.', 

'Jennifer C.': `We had a great stay at Gina's home. We traveled with our three teenagers who loved the game room and foosball table. The house is conveniently located near Plattekill mountain and short drive to Belleayre Mountain for skiing. Great restaurants nearby for our dinners out. If traveling during the holiday week definitely remember to make dinner reservations if you have a group.`, 'Audra': `We enjoyed our stay, the game room was super fun!
The host was flexible and kind in offering us the ability to check in earlier because it was pouring rain all day, which hindered our plans of hiking and being outdoors, which we very much appreciated.
Thank you for your hospitality.`, 

'John': 'Plenty of room. We will be back when we head that way again!!!', 

'Kevin': 'Lovely place, clean, and lots of fun not only for the kids, but adults as well. The only thing was water pressure was a bit low, but otherwise a great place to stay.', 

'Ashley and Jon': 'Would definitely stay here again! This house was comfortable and felt like home!', 

'Chien-Nien': `Gina’s place is great to our ski trip. Rooms are clean and warm, perfect for heavy workout days on the slopes, and the game room was a plus to young kids and young in heart. Bathrooms are very clean and Kitchen is very well stocked and equipped. Coffee maker, espresso machine, air-flyer, water filtration machine. The only downside is the temperature at first floor living aria and workout room was too low for use (we are at the time when the winter storm hit), but after days on the slopes, who need bike machine anyway. My wife did point out that she wish to have her place to relax and read while boys are making noise in the game room. It’s still a great place to recommend for families with kids.`, 

'Angel': 'Great host, great place, a lot of potential, all what we needed was in the house, very entertaining play room for kids and adults. We really enjoyed everything about this place. thank you Gina' };


export default function ReviewsDefault() {

return (
    <>
    <div className='border-review'>
    <div className='review-text'>
        {reviewsList.Justin}   -Justin
    </div>
    <div className='review-text'>
        {reviewsList.SuzanneMontana20}   -SuzanneMontana20
    </div>
    <div className='review-text'>
        {reviewsList.David}   -David
    </div>
    <div className='review-text'>
        {reviewsList.Jennifer}   -Jennifer
    </div>
    <div className='review-text'>
        {reviewsList.Victoria}   -Victoria
    </div>
    <div className='review-text'>
        {reviewsList.Greg}   -Greg
    </div>
    <div className='review-text'>
        {reviewsList.Jian}  -Jian
    </div>
    <div className='review-text'>
        {reviewsList.Meghan}  -Meghan
    </div>
    <div className='review-text'>
        {reviewsList['Jennifer C.']}  -Jennifer C.
    </div>
    <div className='review-text'>
        {reviewsList.Kevin}  -Kevin
    </div>
    <div className='review-text'>
        {reviewsList['Chien-Nien']}  -Chien-Nien
    </div>
    <div className='review-text'>
        {reviewsList.Angel}  -Angel
    </div>
    <div className='review-text'>
        {reviewsList['Ashley and Jon']}  -Ashley and Jon
    </div>
    </div>
    </>
)
}
;