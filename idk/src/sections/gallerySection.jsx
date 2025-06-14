import picture from '../assets/images/amrita_shergil.png'
import starryNights from '../assets/images/starrynight.png'
import womanWithParasol from '../assets/images/womanwiththeparasol.png'
import theBridesToilet from '../assets/images/thebridestoilet.png'
import shakuntalaPatra from '../assets/images/shakuntalapatralekhan.png'
import lines from '../assets/somelines.svg'
import { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform } from 'motion/react'
import { motion } from 'motion/react'
import {Link} from 'react-router-dom'

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
                    <Link to="/artwork">Explore more</Link>
                </div>
                { currentId === artworks.length-1 && 
                <motion.div 
                    className={`z-20 p-2 absolute bottom-5 text-white border-white border rounded-full transition-all`} 
                    style={{backgroundColor: artworks[currentId].dom[0]}}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    >
                        <p >by Niharika.</p>
                </motion.div>
                }
                
                <motion.button
                        className="absolute z-50 bottom-10 right-30 md:right-50 px-4 py-1 bg-[#F1893A] text-white font-newsreader rounded-full shadow-lg shadow-black/80 hover:bg-[#f1713a] hover:border"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{x:100}}
                        ></motion.button>
            
            </motion.div>

        </div>
    )
}

export default Gallery;

const artworks = [
    {
        id: 0,
        img: starryNights,
        dom: ['rgb(70,57,57)', 'rgb(30,15,15)'],
        title: "The Starry Nights",
        artist: "Vincent Van Gogh",
        year: 1889,
        description: '"The Starry Nights" is a renowned oil painting by Dutch Post-Impressionist painter Vincent van Gogh, created in June 1889. The painting depicts a view from the east-facing window of his asylum room in Saint-Rémy-de-Provence, just before sunrise, and includes an imaginative village. It is now housed at the Museum of Modern Art in New York.'
    },
    {
        id: 1,
        img: womanWithParasol,
        dom: ['rgb(91,129,167)', 'rgb(155,133,133)'] ,
        title: "Woman with a Parasol - Madame Monet and Her Son",
        artist: "Claude Monet",
        year: 1875,
        description: "The artist's wife Camille stands on a hill with their son Jean behind her. Monet worked quickly to record this moment. Sketching the sky in chaotic strokes of blue and gray, he left areas of canvas exposed in his haste. The grass is more densely painted in short brushstrokes of green, blue, and brown. Small dabs of yellow suggest buttercups, and the color is reflected on Camille's sleeve. The dense slashes of brilliant white on the back of her skirt and jacket catch the light. Completed in a single outdoor session, this is a celebration of color and light."
    },
    {
        id: 2,
        img: theBridesToilet,
        dom: ['rgb(70,57,57)', 'rgb(30,15,15)'] ,
        title: "Bride's Toilet",
        artist: "Amrita Sher-Gil",
        year: 1937,
        description: "A work of modernism, the painting draws influence from the frescoes of Ajanta and the miniatures of Mughal art, thereby resulting in a masterful amalgam of Indian and European styles. Bride's Toilet depicts a bride's chamber, wherein a young light-skinned woman, presumably the titular bride, is seated. She is half-naked; her palms are covered in mehndi. She is surrounded by two other women and two children. Their faces are expressionless. Tones have been skilfully used. The painting demonstrates Sher-Gil's curious interest in women, their lives and adversities."
    },
    {
        id: 3,
        img: shakuntalaPatra,
        dom: ['rgb(90,90,45)', 'rgb(105,105,45)'],
        title: "Shakuntala Patra-lekhan",
        artist: "Raja Ravi Varma",
        year: 1876,
        description: "Shakuntala Patra-lekhan is a painting by Raja Ravi Varma, depicting the moment when Shakuntala, the daughter of sage Vishwamitra and Menaka, is writing a letter to her husband Dushyanta. The painting captures the essence of Indian mythology and the beauty of Shakuntala's character. It is known for its intricate details and vibrant colors, showcasing Varma's mastery in blending traditional Indian art with European techniques."
    }
]