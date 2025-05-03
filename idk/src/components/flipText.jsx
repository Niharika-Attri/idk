import { hover, motion } from "motion/react"

function FlipText({text}) {
    const DURATION = 0.25;
    const STAGGERED = 0.025;

    return (
            <motion.div initial="initial" whileHover="hovered" className="relative  overflow-hidden block whitespace-nowrap  capitalize" style={{lineHeight:0.9}} >
                <div>
                    {text.split("").map((l, i) => (
                        <motion.span 
                        variants={{
                            "initial": {
                                y:0
                            },
                            "hovered":{
                                y:"-100%"
                            }
                        }}
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGERED * i
                        }}
                        className="inline-block"
                        key={i}
                        >
                            {l}
                        </motion.span>
                    ))}
                </div>
                <div
                    className="absolute inset-0">
                    {text.split("").map((l, i) => (
                        <motion.span 
                        variants={{
                            "initial": {
                                y:"100%"
                            },
                            "hovered":{
                                y:0
                            }
                            }}
                            
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGERED * i
                        }}
                            className="inline-block"
                            key={i}>
                                {l}
                            </motion.span>
                    ))}
                </div>
            </motion.div>
    );
}

export default FlipText