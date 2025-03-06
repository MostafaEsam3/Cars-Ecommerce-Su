import React from 'react';
import FirstHero from '../FirstHero/FirstHero';
import SecondHero from '../SecondHero/SecondHero';
import Cards from '../Cards/Cards';
import Category from '../CategorySection/Category';
import BestSelling from '../BestSelling/BestSelling';
import BeutyImage from '../BeutyImage/BeutyImage';
import NewArrival from '../NewArrival/NewArrival';
import Icon from '../IconsSection/Icon';
import Footer from '../Footer/Footer';
import CarouselComponent from '../SliderAnimation/Slider';
import Slide from '../SliderAnimation/Slider';
import TawkToScript from '../Chat/Chat';

const Hero = () => {
    return (
        <>
        <div className='container mt-4  pb-3 mainFont' style={{height:"auto"}}>
        <Slide/>
        {/* <FirstHero/> */}
        {/* < Category/> */}
        {/* <SecondHero/> */}
        <Cards/>
       {/* <BestSelling/> */}
       {/* <BeutyImage/> */}
       {/* <NewArrival/>
       <Icon/> */}
       <TawkToScript/>
        </div>

        </>
    );
}

export default Hero;
