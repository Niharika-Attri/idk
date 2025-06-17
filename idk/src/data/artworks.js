import starryNights from '../assets/images/starrynight.png'
import womanWithParasol from '../assets/images/womanwiththeparasol.png'
import theBridesToilet from '../assets/images/thebridestoilet.png'
import shakuntalaPatra from '../assets/images/shakuntalapatralekhan.png'

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

export default artworks