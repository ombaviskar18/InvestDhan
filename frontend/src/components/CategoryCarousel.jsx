import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/businessinfoSlice'

const category = [
    "Startup",
    "Franchise",
    "Real Estate",
    "Mutual Funds",
    "Luxury Things",
    "Trade"
]

const CategoryCarousel = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchBusinessinfoHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
}
  return (
    <div>
    <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
                {
                    category.map((cat,index) => (
                        <CarouselItem className="md:basis-1/3 lg-basis-1/4">
                                <Button onClick={()=> searchBusinessinfoHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
                        </CarouselItem>
                    ))
                }
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
    </Carousel>
    </div>
  )
}

export default CategoryCarousel