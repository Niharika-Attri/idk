import picture from '../assets/images/amrita_shergil.png'
import starryNights from '../assets/images/starrynight.png'
import womanWithParasol from '../assets/images/womanwiththeparasol.png'
import theBridesToilet from '../assets/images/thebridestoilet.png'
import shakuntalaPatra from '../assets/images/shakuntalapatralekhan.png'
import { useRef, useState } from 'react'

function Gallery(){
    const ref = useRef(null)
    const [currentId, setCurrentId] = useState(3)
    return(
        <div className="relative h-[400vh] w-screen bg-[#232323]">
            <div className='sticky flex items-center justify-center top-0 h-screen w-screen bg-amber-400'>
                {/* card */}
                <div className='w-[300px] md:w-[400px] lg:w-[500px] p-2 md:p-4  bg-white'>
                    <img 
                        ref={ref}
                        className='pb-2'
                        src={artworks[currentId].img}
                        />
                    <p>{artworks[currentId].artist}</p>
                    <p>{artworks[currentId].year}</p>
                </div>

                {/* details */}
                <div className='w-[300px]'>
                    <h2>{artworks[currentId].title}</h2>
                    <p>{artworks[currentId].artist}, {artworks[currentId].year}</p>
                    <p>{artworks[currentId].description}</p>

                </div>
            </div>
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
        description: 'The artist’s wife Camille stands on a hill with their son Jean behind her. Monet worked quickly to record this moment. Sketching the sky in chaotic strokes of blue and gray, he left areas of canvas exposed in his haste. The grass is more densely painted in short brushstrokes of green, blue, and brown. Small dabs of yellow suggest buttercups, and the color is reflected on Camille’s sleeve. The dense slashes of brilliant white on the back of her skirt and jacket catch the light. Completed in a single outdoor session, this is a celebration of color and light.'
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