
import lines from '../assets/somelines.svg'
import { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform } from 'motion/react'
import { motion } from 'motion/react'
import {Link} from 'react-router-dom'
import artworks from '../data/artworks'

function Gallery(){
    const canvasRef = useRef(null)
    const [currentId, setCurrentId] = useState(0)
    const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 })

    const targetRef = useRef(null)
    const {scrollYProgress} = useScroll({
        target: targetRef
    })
    const indexProgress = useTransform(scrollYProgress, [0,1], [0, artworks.length-1])
    
    useEffect(() => {
        const unsubscribe = indexProgress.on('change', (value) => {
            const newIndex = Math.round(value)
            if (newIndex !== currentId && newIndex >= 0 && newIndex < artworks.length) {
                setCurrentId(newIndex)
            }
        })
        
        return unsubscribe
    }, [indexProgress, currentId])

    // Load image and draw on canvas
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const img = new Image()
        
        img.onload = () => {
            // Set canvas dimensions to match image
            canvas.width = img.width
            canvas.height = img.height
            setCanvasDimensions({ width: img.width, height: img.height })
            
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0)
            
        }
        
        img.src = artworks[currentId].img
    }, [currentId])
    
    return(
        <div ref={targetRef} className="relative h-[400vh] w-screen bg-[#232323]">
            
            <motion.div 
                className='sticky flex overflow-hidden items-center justify-center top-0 h-screen w-screen transition-all duration-800 ease-out'
                animate={{ 
                    background: `linear-gradient(135deg, ${artworks[currentId].dom[0]} 0%, ${artworks[currentId].dom[1]} 100%)`
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                
            >
                <img
                src={lines}
                className='absolute bottom-[-100px] right-[-100px]'
                />
                <img
                src={lines}
                className='absolute z-0 rotate-180 top-[-100px] left-[-100px]'
                />
                {/* card */}
                <div className='z-20 w-[300px] md:w-[400px] lg:w-[500px] p-2 md:p-4 bg-white'>
                    <canvas 
                        ref={canvasRef}
                        className='pb-2 max-w-full h-auto'
                        style={{
                            maxWidth: '100%',
                            height: 'auto'
                        }}
                    />
                    <p>{artworks[currentId].artist}</p>
                    <p>{artworks[currentId].year}</p>
                </div>

                {/* details */}
                <div className='hidden font-newsreader z-50 lg:block w-[400px] h-[400px] md:ml-8 p-6 bg-white/90 rounded-lg rounded-br-[100px]'>
                    <h2 className='text-2xl font-bold mb-2 text-gray-800'>{artworks[currentId].title}</h2>
                    <p className='text-lg mb-4 text-gray-700'>{artworks[currentId].artist}, {artworks[currentId].year}</p>
                    <p className='text-sm leading-relaxed text-gray-600'>{artworks[currentId].description}</p>
                    
                </div>
                { currentId === artworks.length-1 && 
                <motion.div 
                    className={`z-20 p-2 absolute bottom-5 text-white border-white border rounded-full transition-all`} 
                    style={{backgroundColor: artworks[currentId].dom[0]}}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    >
                        <p >By Niharika.</p>
                </motion.div>
                }
                
                {/* <motion.button
                        className="absolute z-50 bottom-10 right-30 md:right-50 px-4 py-1 bg-[#F1893A] text-white font-newsreader rounded-full shadow-lg shadow-black/80 hover:bg-[#f1713a] hover:border"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{x:100}}
                        ></motion.button> */}
            
            </motion.div>

        </div>
    )
}

export default Gallery;

