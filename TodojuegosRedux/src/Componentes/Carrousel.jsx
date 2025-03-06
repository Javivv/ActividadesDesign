import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination, Autoplay } from "swiper/modules"
import { fetchCarrouselImages } from "../slices/carrouselSlice"

const Carrousel = () => {
  const dispatch = useDispatch()
  const { imagenes, status, error } = useSelector((state) => state.carrousel)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCarrouselImages())
    }
  }, [status, dispatch])

  if (status === "loading") {
    return <div>Cargando...</div>
  }

  if (status === "failed") {
    return <div>Error: {error}</div>
  }

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
                src={img || "/placeholder.svg"}
                alt={`Imagen ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Carrousel

