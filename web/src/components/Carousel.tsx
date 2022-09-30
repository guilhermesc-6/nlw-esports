import { useKeenSlider } from "keen-slider/react"; // import from 'keen-slider/react.es' for to get an ES module
import { GameBanner } from "./GameBanner";

import { CaretLeft, CaretRight } from "phosphor-react";

import "keen-slider/keen-slider.min.css";

import { Game } from "../App";
import { useEffect, useState } from "react";

interface CrouselProps {
  games: Game[];
}

export function Carousel({ games }: CrouselProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    created() {
      instanceRef.current?.update({ slides: 1 });
    },
    loop: true,
    initial: 0,
    breakpoints: {
      "(min-width: 300px)": {
        slides: { perView: 1, spacing: 5 },
      },
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(min-width: 480px)": {
        slides: { perView: 3, spacing: 10 },
      },
      "(min-width: 650px)": {
        slides: { perView: 4, spacing: 10 },
      },
      "(min-width: 800px)": {
        slides: { perView: 5, spacing: 10 },
      },
      "(min-width: 900px)": {
        slides: { perView: 6, spacing: 24 },
      },
    },
    slides: { perView: 1, origin: "center" },
    mode: "free",
  });

  return (
    <div className='w-full flex items-center mt-16'>
      <div
        className='cursor-pointer'
        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
      >
        <CaretLeft
          size={48}
          className='text-zinc-400'
        />
      </div>

      <div
        ref={sliderRef}
        className='keen-slider grid grid-cols-6 relative lg:place-items-center'
      >
        {games.map((game) => {
          return (
            <div
              className='keen-slider__slide  w-auto h-auto rounded-lg overflow-hidden '
              key={game.id}
            >
              <GameBanner
                title={game.title}
                bannerUrl={game.bannerUrl}
                adsCount={game._count.ads}
                id={game.id}
              />
            </div>
          );
        })}
      </div>

      <div
        className='cursor-pointer'
        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
      >
        <CaretRight
          size={48}
          className='text-zinc-400'
        />
      </div>
    </div>
  );
}
