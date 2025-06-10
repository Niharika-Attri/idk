import ArtistCard from "../components/artistCard";
import amritashergil from "../assets/images/amrita_shergil.png"
import claudeMonet from "../assets/images/claude_monet.png"
import rajaRaviVarma from "../assets/images/raja_ravi_varma.png"
import vincentVanGogh from "../assets/images/vincet_van_gogh.png"
import frame from "../assets/frame.svg"
import lines from "../assets/lines.png"
import downArrows from "../assets/downArrows.png"
import { useEffect, useRef, useState } from "react";
import { useScroll, motion, useTransform } from "motion/react";

function Artists(){
    let [currentId, setCurrentId] = useState(0);
    const targetRef = useRef(null);
    const {scrollYProgress} = useScroll({
        target: targetRef
    })
    const indexProgress = useTransform(scrollYProgress, [0, 1], [0, data.length-1])

    useEffect(() => {
        const unsubscribe = indexProgress.on("change",((value) => {
            const newIndex = Math.round(value);
            setCurrentId(newIndex);
            }))
            return () => unsubscribe();
        }, [indexProgress]);

    return(
        <div
            ref={targetRef} className="relative h-[400vh] w-screen bg-[#232323] ">
                <div className="sticky top-0 h-screen flex flex-col p-12 items-center justify-center overflow-hidden bg-[#232323] ">
                    <h5 className="font-newsreader text-xl text-white ">Discover the Artists</h5>
                    <motion.svg 
                        className="translate-y-[-6px]" 
                        width="200" 
                        height="8" 
                        overflow="visible" 
                        viewBox="0 0 287 8" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg">
                        <motion.path
                            initial={{
                                pathLength: 0,

                            }}
                            animate={{
                                pathLength: 1,
                                transition:{
                                    duration: 2,
                                    repeat: Infinity
                                }
                            }}
                            d="M1 8.11311C7.99945 5.04698 15.3104 1 23.1791 1C25.3948 1 26.9509 2.5757 28.9091 2.77828C32.8248 3.18335 36.084 5.89026 40.2209 5.89026C42.8466 5.89026 45.6626 6.24913 48.1244 5.22341C50.3829 4.28237 53.7812 2.41799 56.2254 2.33371C61.683 2.14552 66.1997 2.54243 70.7974 5.69268C72.6027 6.92962 74.5419 9.68018 76.8732 9.86669C79.82 10.1024 84.04 10.5089 86.8019 9.49621C90.9912 7.96012 95.1862 6.43788 99.4474 5.05052C101.78 4.29118 105.183 2.95077 107.598 2.77828C109.913 2.61288 112.181 5.15817 113.723 6.60651C116.009 8.75353 116.988 9.89139 120.046 9.89139C128.285 9.89139 135.951 4.98816 144.151 4.55655C146.466 4.43475 147.593 5.07366 149.461 6.55712C151.018 7.79328 152.608 10.2727 154.821 10.336C158.734 10.4477 161.285 9.40899 164.898 7.91552C169.87 5.86031 175.413 4.29237 180.606 2.97586C182.234 2.56313 184.676 2.16852 186.385 2.35841C188.688 2.6142 191.122 5.50422 193.301 6.43363C195.808 7.50272 196.616 8.11311 199.426 8.11311C201.946 8.11311 204.538 8.16984 206.984 7.47095C210.114 6.57672 212.894 5.22567 216.172 4.75414C219.778 4.2353 223.035 2.90974 226.619 2.35841C229.116 1.97426 230.216 3.74802 232.028 5.09992C237.762 9.37742 245.654 12.4693 252.873 9.59501C255.321 8.62048 257.506 7.09123 259.986 6.13725C262.469 5.18244 265.03 4.84468 267.544 4.06259C270.064 3.27875 272.415 2.19309 275.151 2.87707C276.439 3.19912 277.429 4.18332 278.609 4.75414C279.272 5.07508 280.07 6.22254 280.684 6.31013C282.097 6.51207 283.65 6.33483 285.08 6.33483" 
                            stroke="#F1893A" 
                            strokeWidth="2" 
                            strokeLinecap="round"/>
                    </motion.svg>
                    <div className="flex relative w-full justify-center items-center">
                        <img className="absolute scale-[180%] translate-y-[-25px] opacity-0 lg:opacity-100" src={lines}/>
                        <motion.h2 
                            key={currentId} 
                            className="text-white font-newsreader text-4xl md:text-7xl pb-5 md:pb-8"
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: 1
                            }}
                            transition={{
                                duration: 1,
                                ease: "easeInOut"
                            }}
                        >
                        {data[currentId].name}
                        </motion.h2>
                    </div>
                    
                    <div className="flex gap-20">
                        {/* left card */}
                        <motion.div 
                            key={data[currentId].id - 1} 
                            initial={{ x:150, opacity: 1 }}
                            animate={{ x:0, opacity: 1 }}
                            transition={{ duration: 0.5}}  
                            className="z-10 rotate-[-12deg] translate-x-[-50px] translate-y-[50px]">
                            <ArtistCard
                                bg='#232323'
                                shadow='#ffffff'
                                card={data[currentId -1] || data[data.length - 1]}/>
                        </motion.div>

                        {/* mid card */}
                        <div className="relative">
                            <img className="absolute top-3 scale-110 md:scale-[120%] " src={frame} />
                            <motion.div
                                key={`middle-${data[currentId].id}`}
                                initial={{ x: 150, scale: 0.9 }}
                                animate={{ x: 0, scale: 1.1 }}
                                transition={{ duration: 0.6}}
                                >
                                    
                                <ArtistCard
                                    bg='#232323'
                                    shadow='#ffffff'
                                    card={data[currentId]}/>
                            </motion.div>
                        </div>
                        

                        {/* right card */}
                        <motion.div 
                            key={data[currentId].id + 1} 
                            initial={{ x:150}}
                            animate={{ x:0}}
                            transition={{ duration: 0.5}} 
                            className="z-30 opacity-0 md:opacity-100 rotate-[12deg] translate-x-[50px] translate-y-[50px]">
                            <ArtistCard
                                bg='#232323'
                                shadow='#ffffff'
                                card={data[currentId + 1] || data[0]}/>
                        </motion.div>
                    </div>
                    <p className="font-newsreader text-sm pt-10 text-white">Scroll down</p>
                    <img className="w-3" src={downArrows}/>
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