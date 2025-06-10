import aboutframes from '../assets/images/aboutFrames.png'
import drawnRoads from '../assets/images/drawn road.png'

function About(){

    return(
        <div 
            className="flex flex-col items-center justify-center w-full max-w-full overflow-hidden p-12 px-10 md:p-14 lg:px-16 xl:px-24 bg-linear-to-b from-[#232323] to-[#3E3C36] text-white lg:text-xl xl:text-2xl"
            >
                <p 
                    className="font-newsreader pb-5"
                >Masterpieces by great artists are admired by many — but few truly know the stories behind them. What shaped their vision? What moments in their lives bled into the brushstrokes?</p>

                <div className="grid gap-8 md:gap-0 md:grid-cols-2 w-full justify-around">
                    <img 
                        src={aboutframes}
                        className='w-full h-auto '
                        />
                    
                    <div className=' w-full flex flex-col items-center justify-center mb-4 md:mb-0'>
                        <div 
                            className='flex flex-col items-center justify-center font-newsreader text-[#FFF3C5] text-lg xl:text-3xl translate-y-[-17px] translate-x-[-17px] xl:translate-y-[-40%] xl:translate-x-[-40%]'
                            >
                            <p>Walk with the artists.</p>
                            <p>Trace the path.</p>
                            <p>Feel the soul of the work.</p> 
                        </div>
                        
                        <img 
                            src={drawnRoads}
                            className='absolute w-[70%] md:w-[40%] translate-y-[17px] translate-x-[17px]'/>
                    </div>
                </div>
        </div>
    )
}

export default About