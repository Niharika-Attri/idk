
import { useEffect, useRef, useState } from "react";
import ArtistCard from "../components/artistCard";
import Artists from "../sections/artistSection";
import HoverFlipText from "../components/hoverFlipText";
import HeroSection from "../sections/heroSection";
import About from "../sections/aboutSection";
import {motion} from "framer-motion";
import Gallery from "../sections/gallerySection";

function Homepage(){

    return(
        <div className="flex items-center justify-center flex-col w-screen min-h-screen ">
            <HeroSection/>
            <About/>
            <Artists/>
            <Gallery/>
        </div>
        
        
    )
}

export default Homepage