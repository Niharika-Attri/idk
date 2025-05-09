import ArtistCard from "../components/artistCard";
import amritashergil from "../assets/images/amrita_shergil.png"
import claudeMonet from "../assets/images/claude_monet.png"
import rajaRaviVarma from "../assets/images/raja_ravi_varma.png"
import vincentVanGogh from "../assets/images/vincet_van_gogh.png"
import { useEffect, useRef, useState } from "react";
import { useScroll, motion, useTransform } from "motion/react";
import FlipText from "../components/flipText";

function Artists(){
    let [currentId, setCurrentId] = useState(0);
    const targetRef = useRef(null);
    const {scrollYProgress} = useScroll({
        target: targetRef
    })
    const indexProgress = useTransform(scrollYProgress, [0, 1], [0, data.length-1])

    useEffect(() => {
        const unsubscribe = indexProgress.onChange((value) => {
            const newIndex = Math.round(value);
            setCurrentId(newIndex);
            });
            return () => unsubscribe();
        }, [indexProgress]);

    return(
        <div
            ref={targetRef} className="relative h-[300vh] w-screen bg-[#232323] ">
                <div className="sticky top-0 h-screen flex flex-col p-12 items-center justify-center overflow-hidden bg-[#232323] ">
                    <h5 className="font-newsreader text-xl text-white pb-3">Discover the Artists</h5>
                    <motion.h2 key={data[currentId]} className="text-white font-newsreader text-7xl pb-4"><FlipText text={data[currentId].name}/></motion.h2>
                    <div className="flex gap-20">
                        {/* left card */}
                        <motion.div 
                            key={data[currentId].id - 1} // Ensure animation on change
                            initial={{ x:100, opacity: 1 }}
                            animate={{ x:0, opacity: 1 }}
                            transition={{ duration: 0.5 }}  
                            className="z-10 rotate-[-12deg] translate-x-[-50px] translate-y-[50px]">
                            <ArtistCard
                                bg='#232323'
                                shadow='#ffffff'
                                card={data[currentId -1] || data[data.length - 1]}/>
                        </motion.div>

                        {/* mid card */}
                        <motion.div
                            key={`middle-${data[currentId].id}`}
                            initial={{ x: 100, opacity: 0.5, scale: 0.9 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                            <ArtistCard
                                bg='#232323'
                                shadow='#ffffff'
                                card={data[currentId]}/>
                        </motion.div>

                        {/* right card */}
                        <motion.div 
                            key={data[currentId].id + 1} // Ensure animation on change
                            initial={{ x:100, opacity: 1 }}
                            animate={{ x:0, opacity: 1 }}
                            transition={{ duration: 0.5 }} 
                            className="z-30 rotate-[12deg] translate-x-[50px] translate-y-[50px]">
                            <ArtistCard
                                bg='#232323'
                                shadow='#ffffff'
                                card={data[currentId + 1] || data[0]}/>
                        </motion.div>
                    </div>
                </div>  

        </div>
    )
}

export default Artists;

const data = [
    {
        id: 1,
        name: "Amrita Sher-Gil",
        img:   amritashergil
    },
    {
        id: 2,
        name: "Claude Monet",
        img:   claudeMonet
    },
    {
        id: 3,
        name: "Raja Ravi Varma",
        img:   rajaRaviVarma
    },
    {
        id: 4,
        name: "Vincent Van Gogh",
        img:   vincentVanGogh
    }
]