import { useEffect, useState } from "react";
import slide1 from "../assets/BMax-Carousel/Slide1.jpg";
import slide2 from "../assets/BMax-Carousel/Slide2.jpg";
import slide3 from "../assets/BMax-Carousel/Slide3.jpg";

const slides = [
  {
    id: 1,
    image: slide1 ,
    title: "Smart Shopping AI",
    subtitle: "Our organization is adopting AI rapidly. we are just attempting to keep up"
  },
  {
    id: 2,
    image: slide2 ,
    title: "Redefining Retail Intelligence",
    subtitle: "Finally, a system that recommends more than just 'bestsellers'."
  },
  {
    id: 3,
    image: slide3 ,
    title: "Dynamic Deals for Dynamic Buyers",
    subtitle: "Designed to predict your needs… or at least pretend convincingly"
  }
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="carousel-slide"
            style={{ backgroundImage: `url(${slide.image})` }}
          > <div className="carousel-text">
    <h2>{slide.title}</h2>
    {slide.subtitle && <p>{slide.subtitle}</p>}
  </div></div>
          
        ))}
      </div>
    </div>
  );
}
