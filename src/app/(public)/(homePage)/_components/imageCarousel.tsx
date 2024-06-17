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
            className=" mx-auto max-h-[calc(100vh-128px)]   overflow-hidden"
            dir="ltr"
            opts={{ slidesToScroll: 1, loop: true }}
        >
            <CarouselContent className=" mx-auto w-full flex items-center justify-start h-full">
                {Images.map((image, index) => (
                    <CarouselItem
                        key={index}
                        className="mx-auto flex items-center justify-center h-full relative  "
                    >
                        <Image
                            src={image}
                            alt=""
                            width={image.width}
                            height={image.height}
                            className="w-full h-full object-center  cursor-grab "
                            priority={true}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};

export default ImageCarousel;
