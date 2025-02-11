/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { obtenerJuegosPopulares } from "../Servicios/apiJuegos";

const Carrousel = () => {
  const [imagenes, setImagenes] = useState(
    Array(3).fill("https://via.placeholder.com/800x400?text=Loading...")
  );

  useEffect(() => {
    let isMounted = true;
    obtenerJuegosPopulares()
      .then((juegos) => {
        if (isMounted && juegos.length > 0) {
          setImagenes(juegos.slice(0, 3).map((game) => game.background_image));
        }
      })
      .catch(console.error);
      
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true, type: "bullets" }}
        className="progress-slide-carousel"
      >
        {imagenes.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center overflow-hidden">
              <img 
                src={img} 
                alt={`Imagen ${index + 1}`} 
                className="w-full h-full object-cover rounded-2xl" 
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carrousel;
