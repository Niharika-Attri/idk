import aboutframes from '../assets/images/aboutframes.png'
import drawnRoads from '../assets/images/drawn road.png'
import { motion, stagger } from "motion/react"

function About(){
    
    const fadeInVariants = {
        hidden: {
            transition:{
                staggerDirection: -1
            }
        },
        inView: {
            transition:{
                staggerChildren: 0.2,
            }
        }
    }

    const elementVariants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        inView: {
            opacity: 1,
            y: 0,
            transition:{
                duration: 0.3,
                ease: "easeOut"
            }
        }
    }

    return(
        <motion.div 
            className="flex flex-col items-center justify-center w-full max-w-full overflow-hidden p-12 px-10 md:p-14 lg:px-16 xl:px-24 bg-linear-to-b from-[#232323] to-[#3E3C36] text-white lg:text-xl xl:text-2xl"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="inView"
            viewport={{ once: false, amount: 0.3 }}>
                <motion.p 
                    className="font-newsreader pb-5"
                    variants={elementVariants}
                >Masterpieces by great artists are admired by many — but few truly know the stories behind them. What shaped their vision? What moments in their lives bled into the brushstrokes?</motion.p>

                <div className="flex w-full justify-around">
                    <motion.img 
                        src={aboutframes}
                        className='w-1/2'
                        variants={elementVariants}
                        />
                    
                    <div className=' w-full flex flex-col items-center justify-center '>
                        <motion.g 
                            className='flex flex-col items-center justify-center font-newsreader text-[#FFF3C5] text-lg xl:text-3xl translate-y-[-17px] translate-x-[-17px] xl:translate-y-[-40%] xl:translate-x-[-40%]'
                            variants={elementVariants}
                            >
                            <p>Walk with the artists.</p>
                            <p>Trace the path.</p>
                            <p>Feel the soul of the work.</p> 
                        </motion.g>
                        
                        <motion.img 
                            src={drawnRoads}
                            className='absolute w-[40%] translate-y-[17px] translate-x-[17px]'
                            variants={elementVariants}/>
                    </div>
                </div>
        </motion.div>
    )
}

export default About