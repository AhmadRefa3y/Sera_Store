"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import billboard1 from "/public/billboard1.webp";
import billboard2 from "/public/billboard2.webp";
import Image from "next/image";

const ImageCarousel = () => {
    const Images = [billboard1, billboard2];
    return (
        <Carousel
            className=" mx-auto max-h-[calc(100vh-128px)]   w-full  overflow-hidden"
            dir="ltr"
            opts={{ slidesToScroll: 1, loop: true }}
        >
            <CarouselContent className=" mx-auto w-full flex items-center justify-start h-full">
                {Images.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="mx-auto flex items-center justify-center  min-h-[450px] sm:min-h-[600px] h-full relative  ">
                            <Image
                                src={image}
                                alt=""
                                fill
                                quality={100}
                                className="w-full h-full object-center object-cover  cursor-grab "
                                priority={true}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};

export default ImageCarousel;
