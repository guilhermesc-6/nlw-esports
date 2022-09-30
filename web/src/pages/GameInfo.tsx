import { useLoaderData, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";

import { GameCard } from "../components/GameCard";
import { DuoCardProps } from "../components/GameCard";

import { Game } from "../App";
import { CheckCircle, HouseSimple, XCircle, Clipboard } from "phosphor-react";

export function GameInfo() {
  const game = useLoaderData() as DuoCardProps[];
  const [banner, setBanner] = useState<string>("");
  const { gameTitle, gameId } = useParams();
  const [adId, setAdId] = useState<string>("");
  const [discord, setDiscord] = useState<string>("");

  function handleConnectDiscord(id: string) {
    setAdId(id);
  }

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) =>
      response.data.map((item: Game) => {
        if (item.id === gameId) {
          setBanner(item.bannerUrl);
        }
      })
    );
  }, []);

  useEffect(() => {
    if (adId.length) {
      axios(`http://localhost:3333/ads/${adId}/discord`).then((response) =>
        setDiscord(response.data.discord)
      );
    }
  }, [adId]);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-10 justify-start '>
      <header className='flex flex-col items-center justify-around gap-2 md:gap-8 md:flex-row'>
        <img
          src={banner}
          alt='Logo'
          className='w-full h-52 sm:w-[250px] sm:h-[250px] md:rounded-full '
        />

        <h1 className='text-transparent bg-nlw-gradient bg-clip-text text-2xl'>
          {gameTitle}
        </h1>
        <span className='text-white'>Conecte-se e comece a jogar!</span>
      </header>

      <Link
        to='/'
        className='flex flex-col items-center text-white'
      >
        <HouseSimple size={24} />
        Home
      </Link>

      <Dialog.Root>
        <div className='mt-3 w-full gap-4 w-200'>
          {game.length ? (
            <div className='w-full px-2 flex overflow-x-auto md:grid-cols-6 md:gap-3'>
              {game.map((item) => {
                return (
                  <GameCard
                    data={item}
                    onConnect={handleConnectDiscord}
                  />
                );
              })}
            </div>
          ) : (
            <h1 className='text-3xl text-white mt-9'>
              Não há anuncio para esse game no momento!
            </h1>
          )}
        </div>

        <Dialog.Overlay className='fixed bg-black/50 inset-0' />
        <Dialog.Content className='fixed bg-[#2a2634] py-5 px-4  text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-full shadow-lg shadow-black/25 sm:w-[480px] sm:py-8 sm:px-10'>
          <Dialog.Title className='text-3xl font-black text-center flex flex-col items-center'>
            <CheckCircle className='w-20 h-20 text-emerald-400' />
            Let`s Play
          </Dialog.Title>

          <Dialog.Close className='absolute top-4 right-4 '>
            <XCircle size={24} />
          </Dialog.Close>

          <div className='flex flex-col gap-2 items-center mt-6 font-bold'>
            <span>Adicione no discord</span>
            <span
              className='w-56 h-12 bg-zinc-900 flex gap-3 text-zinc-200 items-center justify-center px-2 py-3 cursor-pointer'
              onClick={(e: any) =>
                navigator.clipboard.writeText(e.target.textContent)
              }
            >
              {discord}
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
