'use client'
import { Carousel } from 'react-bootstrap';
import '../styles/styles.css'
import '../app/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';

const Carousel_Images = [
    { url: 'https://cdni.trulymadly.com/tm-static-assets-production/images/admin/carousal-couple-1.webp' },
    { url: 'https://cdni.trulymadly.com/tm-static-assets-production/images/admin/jodi-1-v3.webp' },
    { url: 'https://cdni.trulymadly.com/tm-static-assets-production/web/jodi-2-v2.webp' },
]

const LoginCarousel = () => {
    return (
        <div>
            <div className='md:max-w-[370px] flex justify-center items-center w-full'>
                <Carousel indicators controls={false} interval={3000} pause={false}>
                    {Carousel_Images.slice(0, 3).map((item, index) => (
                        <Carousel.Item key={index}>
                            <Image
                                className="d-block w-full"
                                src={item.url}
                                alt={`Slide ${index}`}
                                loading="lazy"
                                height={500}
                                width={500}
                                unoptimized
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default LoginCarousel