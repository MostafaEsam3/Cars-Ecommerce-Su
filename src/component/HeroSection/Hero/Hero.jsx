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

const Hero = () => {
    return (
        <>
        <div className='container mt-4  pb-3'style={{height:"auto"}}>
        <FirstHero/>
        <SecondHero/>
        <Cards/>
       < Category/>
       <BestSelling/>
       <BeutyImage/>
       <NewArrival/>
       <Icon/>

            


        </div>
        </>
    );
}

export default Hero;
