import { useEffect, useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";

import { CreateAdBanner } from "./components/CreateAdBanner";

import logoImage from "./assets/Logo-nlw-esports.svg";
import { CreateAdModal } from "./components/CreateAdModal";
import { Carousel } from "./components/Carousel";

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) =>
      setGames(response.data)
    );
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-10 sm:my-20'>
      <img
        src={logoImage}
        alt=''
        className='w-1/2 sm:w-auto'
      />
      <h1 className='text-3xl text-white font-black mt-20 sm:text-6xl'>
        Seu{" "}
        <span className='text-transparent bg-nlw-gradient bg-clip-text'>
          duo
        </span>{" "}
        está aqui.
      </h1>

      <Carousel games={games} />

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
