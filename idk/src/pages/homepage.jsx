
import { useEffect, useRef, useState } from "react";
import ArtistCard from "../components/artistCard";
import Artists from "../sections/artistSection";
import HoverFlipText from "../components/hoverFlipText";
import HeroSection from "../sections/heroSection";
import About from "../sections/aboutSection";
import {motion} from "framer-motion";
import Gallery from "../sections/gallerySection";

function Homepage(){
    const constrainRef = useRef(null)
    const constraints = {
    width: 300,
    height: 300,
    backgroundColor: "var(--hue-1-transparent)",
    borderRadius: 10,
}

const box = {
    width: 100,
    height: 100,
    backgroundColor: "#ff0088",
    borderRadius: 10,
}

    return(
        <div className="flex items-center justify-center flex-col w-screen min-h-screen ">
            <HeroSection/>

            <About/>
            
            <Artists/>
            
            <Gallery/>

            <motion.div ref={constrainRef} style={constraints}>
                <motion.div
                    drag
                    dragElastic={0.2}
                    style={box}
                    dragConstraints={constrainRef}>

                </motion.div>
                <motion.div
                    drag
                    dragElastic={0.2}
                    style={box}
                    dragConstraints={constrainRef}>

                </motion.div>
                <motion.div
                    drag
                    dragElastic={0.2}
                    style={box}
                    dragConstraints={constrainRef}>

                </motion.div>
            </motion.div>
            
        </div>
        
        
    )
}

export default Homepage