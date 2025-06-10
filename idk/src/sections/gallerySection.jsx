import picture from '../assets/images/amrita_shergil.png'
import starryNights from '../assets/images/starrynight.png'
import womanWithParasol from '../assets/images/womanwiththeparasol.png'
import theBridesToilet from '../assets/images/thebridestoilet.png'
import shakuntalaPatra from '../assets/images/shakuntalapatralekhan.png'
import lines from '../assets/somelines.svg'
import { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform } from 'motion/react'
import { motion } from 'motion/react'

function Gallery(){
    const canvasRef = useRef(null)
    const [currentId, setCurrentId] = useState(0)
    const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 })
    const [dominantColors, setDominantColors] = useState(['#fbbf24', '#f59e0b']) // default amber gradient

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

    // Function to extract 2 dominant colors from canvas
    const extractDominantColors = (canvas) => {
    const ctx = canvas.getContext('2d')
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    
    const colorMap = {}
    
    // Sample every 10th pixel for performance
    for (let i = 0; i < data.length; i += 200) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const alpha = data[i + 3]
        
        // Skip transparent pixels
        if (alpha < 125) continue
        
        // Group similar colors (reduce precision)
        const key = `${Math.floor(r/15)*15},${Math.floor(g/15)*15},${Math.floor(b/15)*15}`
        colorMap[key] = (colorMap[key] || 0) + 1
    }
    
    // Helper function to convert RGB to HSL
    const rgbToHsl = (r, g, b) => {
        r /= 255; g /= 255; b /= 255
        const max = Math.max(r, g, b), min = Math.min(r, g, b)
        let h, s, l = (max + min) / 2
        
        if (max === min) {
            h = s = 0 // achromatic
        } else {
            const d = max - min
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break
                case g: h = (b - r) / d + 2; break
                case b: h = (r - g) / d + 4; break
            }
            h /= 6
        }
        return [h * 360, s * 100, l * 100]
    }
    
    // Helper function to convert HSL to RGB
    const hslToRgb = (h, s, l) => {
        h /= 360; s /= 100; l /= 100
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1/6) return p + (q - p) * 6 * t
            if (t < 1/2) return q
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
            return p
        }
        
        if (s === 0) {
            return [l * 255, l * 255, l * 255] // achromatic
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s
            const p = 2 * l - q
            const r = hue2rgb(p, q, h + 1/3)
            const g = hue2rgb(p, q, h)
            const b = hue2rgb(p, q, h - 1/3)
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
        }
    }
    
    // Helper function to enhance light colors
    const enhanceColor = (r, g, b) => {
        const [h, s, l] = rgbToHsl(r, g, b)
        
        // If color is light (lightness > 70) or desaturated (saturation < 30)
        if (l > 70 || s < 30) {
            // Increase saturation and reduce lightness
            const newS = Math.min(100, s + 10) // Boost saturation
            const newL = Math.max(25, l - 20)  // Darken
            return hslToRgb(h, newS, newL)
        }
        
        // If color is already well-saturated and not too light, return as-is
        return [r, g, b]
    }
    
    // Sort colors by frequency and get top 2
    const sortedColors = Object.entries(colorMap)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 2)
    
    if (sortedColors.length >= 2) {
        const [r1, g1, b1] = sortedColors[0][0].split(',').map(Number)
        const [r2, g2, b2] = sortedColors[1][0].split(',').map(Number)
        
        const [eR1, eG1, eB1] = enhanceColor(r1, g1, b1)
        const [eR2, eG2, eB2] = enhanceColor(r2, g2, b2)
        
        return [
            `rgb(${eR1},${eG1},${eB1})`,
            `rgb(${eR2},${eG2},${eB2})`
        ]
    } else if (sortedColors.length === 1) {
        const [r, g, b] = sortedColors[0][0].split(',').map(Number)
        const [eR, eG, eB] = enhanceColor(r, g, b)
        
        // Create a complementary darker variant
        const [h, s, l] = rgbToHsl(eR, eG, eB)
        const [darkerR, darkerG, darkerB] = hslToRgb(h, Math.min(100, s + 10), Math.max(15, l - 25))
        
        return [
            `rgb(${eR},${eG},${eB})`,
            `rgb(${darkerR},${darkerG},${darkerB})`
        ]
    }
    
    return ['rgb(59,130,246)', 'rgb(37,99,235)'] 
}

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
            
            // Clear canvas and draw image
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0)
            
            // Extract dominant colors after image is drawn
            setTimeout(() => {
                const colors = extractDominantColors(canvas)
                setDominantColors(colors)
            }, 100)
        }
        
        img.src = artworks[currentId].img
    }, [currentId])
    
    return(
        <div ref={targetRef} className="relative h-[400vh] w-screen bg-[#232323]">
            
            <motion.div 
                className='sticky flex overflow-hidden items-center justify-center top-0 h-screen w-screen transition-all duration-800 ease-out'
                animate={{ 
                    background: `linear-gradient(135deg, ${dominantColors[0]} 0%, ${dominantColors[1]} 100%)`
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                
            >
                <img
                src={lines}
                className='absolute bottom-[-100px] right-[-100px]'
                />
                <img
                src={lines}
                className='absolute rotate-180 top-[-100px] left-[-100px]'
                />
                {/* card */}
                <div className='z-20 w-[300px] md:w-[400px] lg:w-[500px] p-2 md:p-4  bg-white'>
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
                <div className='hidden lg:block w-[400px] h-[400px] md:ml-8 p-6 bg-white/90 backdrop-blur-sm rounded-lg'>
                    <h2 className='text-2xl font-bold mb-2 text-gray-800'>{artworks[currentId].title}</h2>
                    <p className='text-lg mb-4 text-gray-700'>{artworks[currentId].artist}, {artworks[currentId].year}</p>
                    <p className='text-sm leading-relaxed text-gray-600'>{artworks[currentId].description}</p>
                </div>
            </motion.div>
        </div>
    )
}

export default Gallery;

const artworks = [
    {
        id: 0,
        img: starryNights,
        title: "The Starry Nights",
        artist: "Vincent Van Gogh",
        year: 1889,
        description: '"The Starry Nights" is a renowned oil painting by Dutch Post-Impressionist painter Vincent van Gogh, created in June 1889. The painting depicts a view from the east-facing window of his asylum room in Saint-Rémy-de-Provence, just before sunrise, and includes an imaginative village. It is now housed at the Museum of Modern Art in New York'
    },
    {
        id: 1,
        img: womanWithParasol,
        title: "Woman with a Parasol - Madame Monet and Her Son",
        artist: "Claude Monet",
        year: 1875,
        description: "The artist's wife Camille stands on a hill with their son Jean behind her. Monet worked quickly to record this moment. Sketching the sky in chaotic strokes of blue and gray, he left areas of canvas exposed in his haste. The grass is more densely painted in short brushstrokes of green, blue, and brown. Small dabs of yellow suggest buttercups, and the color is reflected on Camille's sleeve. The dense slashes of brilliant white on the back of her skirt and jacket catch the light. Completed in a single outdoor session, this is a celebration of color and light."
    },
    {
        id: 2,
        img: theBridesToilet,
        title: "Bride's Toilet",
        artist: "Amrita Sher-Gil",
        year: 1937,
        description: "A work of modernism,the painting draws influence from the frescoes of Ajanta and the miniatures of Mughal art, thereby resulting in a masterful amalgam of Indian and European styles. Bride's Toilet depicts a bride's chamber,[8] wherein a young light-skinned woman, presumably the titular bride, is seated. She is half-naked; her palms are covered in mehndi.She is surrounded by two other women and two children.Their faces are expressionless.Tones have been skilfully used. The painting demonstrates Sher-Gil's curious interest in women, their lives and adversities."
    },
    {
        id: 3,
        img: shakuntalaPatra,
        title: "Shakuntala Patra-lekhan",
        artist: "Raja Ravi Varma",
        year: 1876,
        description: "Shakuntala Patra-lekhan is a painting by Raja Ravi Varma, depicting the moment when Shakuntala, the daughter of sage Vishwamitra and Menaka, is writing a letter to her husband Dushyanta. The painting captures the essence of Indian mythology and the beauty of Shakuntala's character. It is known for its intricate details and vibrant colors, showcasing Varma's mastery in blending traditional Indian art with European techniques."
    }
]