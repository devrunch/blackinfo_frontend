import Tilt from "react-parallax-tilt";
import Hero_img from '../assets/images/hero_image2.jpg'

 
const TiltComponent = (
) => {
    return (
        <Tilt glareEnable={false} tiltMaxAngleX={10} 
        tiltMaxAngleY={10} perspective={1000} 
        tiltAngleYInitial={10} 
       >
            <div className='tiltComponent'>
            <img
            src={Hero_img}
            className="max-w-full p-3 md:max-w-full m-auto"
            alt="Illustration"
          />
            </div>
        </Tilt>
    )
}
 
export default TiltComponent;