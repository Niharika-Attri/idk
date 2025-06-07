import dots from "../assets/randomstatic.png"
import bggallery from "../assets/images/gallery.png"
import { motion } from "motion/react"
import { useEffect, useState } from "react";
import HoverFlipText from "../components/hoverFlipText";

function HeroSection(){
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const linesVariants = {
        hidden: {
            strokeOpacity: 0,
            transition: {
                staggerDirection: -1
            }
        },
        visible:{
            strokeOpacity: 1,
            transition:{
                staggerChildren: 1.3
            }
        }
        
    }

    const lineVariant = {
        hidden: {
            pathLength: 0,

        },
        visible:{
            pathLength: 1,
            transition: {
                duration: 1.3,
                ease: "easeOut"
            }
        }
        
    }

    const handleMouseMove = (event) => {
        setMousePosition({
            x: event.clientX,
            y: event.clientY,
        });
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
    
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const moveAmountX = (mousePosition.x / window.innerWidth - 0.5) * 100;
    const moveAmountY = (mousePosition.y / window.innerHeight - 0.5) * 100; 

    return(
        <div className="flex relative items-center justify-center w-full h-screen bg-[#232323] overflow-hidden " style={{backgroundImage: `url(${dots})`}}>
                <img 
                    src={bggallery} 
                    className="absolute max-w-full h-auto object-cover overflow-hidden opacity-0 md:opacity-100 md:scale-150 lg:scale-100" 
                    alt="background"
                    style={{
                        transform: `translate(${-moveAmountX}px, ${-moveAmountY}px)`,
                        transition: 'transform 0.1s ease-out', 
                        }}
                    />
                <h1 className="font-soria text-5xl text-white md:text-6xl xl:text-8xl text-center z-20"  >Wander through a <br/> world of  
                <motion.span className="font-fsomething text-[#F1893A] "><HoverFlipText text="expression"/></motion.span></h1>
                <motion.svg className='absolute max-h-full w-[95%] md:w-[60%] lg:w-[50%] xl:w-[55%]'   viewBox="0 0 1006 443" fill="none" style={{ overflow: 'hidden' }}
                    xmlns="http://www.w3.org/2000/svg">
                    <motion.g variants={linesVariants} initial="hidden" animate="visible" className="  stroke-[#F1893A] stroke-4">
                        <motion.path variants={lineVariant}
                            d="M21.9279 115C26.6459 155.103 24.1818 196.482 24.1818 236.832C24.1818 259.842 30.9433 282.423 30.9433 305.574C30.9433 316.85 28.8867 330.686 32.0702 341.51C35.0511 351.645 33.1971 364.918 33.1971 375.443C33.1971 383.615 34.8483 394.119 33.0719 402.113C31.562 408.907 28.1281 449.122 15.2917 438.425C6.00019 430.682 -8.31748 410.252 13.4135 410.252C32.2058 410.252 52.578 409.73 71.0114 413.007C88.1982 416.062 107.87 417.013 125.354 417.013C132.793 417.013 138.49 421.247 145.889 421.521C156.211 421.903 166.381 423.666 176.691 423.775C202.259 424.044 226.903 428.283 252.82 428.283C261.52 428.283 283.98 427.244 287.88 435.044"  />
                        <motion.path variants={lineVariant} d="M773 13.3182C824.697 13.3182 876.774 15.5721 928.765 15.5721C939.304 15.5721 963.964 19.8625 973.466 14.3199C981.342 9.7254 962.322 -7.72077 962.322 9.31142C962.322 22.6575 968.198 33.7945 969.083 46.6248C970.668 69.6015 976.301 91.5394 978.224 114.615C979.261 127.058 984.86 138.954 984.86 151.303C984.86 160.39 983.87 169.959 985.987 178.85C989.092 191.889 987.114 207.286 987.114 220.671" />
                        <motion.path variants={lineVariant} d="M982.732 276.639C980.566 266.893 986.125 261.635 987.114 253.224C989.638 248.175 1001.79 250.284 1002.77 256.605C1004.01 264.688 1001.99 268.65 996.63 274.01C995.323 275.317 983.325 279.309 982.732 276.639Z" />
                        <motion.path variants={lineVariant} d="M335 428H364.3" />
                    </motion.g>
                    
                </motion.svg>

            </div>
    )
}

export default HeroSection;