import React from 'react';
import bg1 from "./bg-1.jpeg";
import bg2 from "./bg-2.jpeg";
import bg3 from "./bg-3.jpeg";
import bg4 from "./bg-4.jpeg";
import bg5 from "./bg-5.jpeg";
import bg6 from "./bg-6.jpeg";
import bg7 from "./bg-7.jpeg";
import bg8 from "./bg-8.jpeg";
import bg9 from "./bg-9.jpeg";
import bg10 from "./bg-10.jpeg";


const HomeCard = props => {
    const array = [bg1,bg2,bg3,bg4,bg5,bg6,bg7,bg8,bg9,bg10]
    const ranNum = Math.floor(Math.random()*10)
    const backgroundStyle = {
        backgroundImage: `url(${array[ranNum]})`
    }
return <div className="home-screen" id="home-screen" style={backgroundStyle}>

<h1>PhotoLab</h1>
<h3>A minimalist photo sharing app</h3>
</div>
}

export default HomeCard;

