import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Select from "@radix-ui/react-select";
import axios from "axios";

import { Input } from "./Form/input";
import { CaretDown, CaretUp, Check, GameController } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
  const [gameId, setGameId] = useState<string>("");

  const handleCreateAd = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }

    try {
      await axios.post(`http://localhost:3333/games/${gameId}/ads`, {
        name: data.name,
        yearsPlaying: data.yearsPlaying,
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel,
      });

      alert("Anúncio criado com sucesso!");
    } catch (error) {
      alert("Erro ao criar o anúncio");
      console.log(error);
    }
  };

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) =>
      setGames(response.data)
    );
  }, []);
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

      <Dialog.Content className='fixed bg-[#2a2634] py-5 px-4  text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-full  shadow-lg shadow-black/25 sm:w-[480px] sm:py-8 sm:px-10'>
        <Dialog.Title className='text-3xl font-black'>
          Publique um anúncio
        </Dialog.Title>

        <form
          onSubmit={handleCreateAd}
          className='mt-8 flex flex-col gap-4'
        >
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='game'
              className='font-semibold'
            >
              Qual o game?
            </label>

            <Select.Root onValueChange={setGameId}>
              <Select.Trigger className='bg-zinc-900 py-3 px-4 rounded text-sm  flex items-center justify-between'>
                <Select.Value
                  placeholder='Selecione o game que deseja jogar'
                  className='text-zinc-500'
                />
                <Select.Icon>
                  <CaretDown
                    size={24}
                    className='text-zinc-400'
                  />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal className='relative  bg-zinc-900 text-zinc-500 w-full'>
                <Select.Content className='px-3 rounded'>
                  <Select.ScrollUpButton className='flex items-center justify-center'>
                    <CaretUp className='w-5 h-5 text-zinc-200 ' />
                  </Select.ScrollUpButton>
                  <Select.Viewport className='p-1'>
                    {games.map((game) => {
                      return (
                        <Select.Item
                          key={game.id}
                          value={game.id}
                          className='cursor-pointer py-1 hover:text-white'
                        >
                          <Select.ItemText>{game.title}</Select.ItemText>
                        </Select.Item>
                      );
                    })}
                  </Select.Viewport>
                  <Select.ScrollDownButton className='flex items-center justify-center'>
                    <CaretDown className='w-5 h-5 text-zinc-200 ' />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='name'>Seu nome (ou nickname)</label>
            <Input
              id='name'
              name='name'
              placeholder='Como te chamam dentro do game?'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
              <Input
                type='number'
                placeholder='Tudo bem ser ZERO'
                id='yearsPlaying'
                name='yearsPlaying'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='discord'>Qual seu Discord?</label>
              <Input
                type='text'
                id='discord'
                name='discord'
                placeholder='Usuario#0000'
              />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='weekDays'>Quando costuma jogar?</label>

              <ToggleGroup.Root
                type='multiple'
                className='grid grid-cols-4 gap-2'
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value='0'
                  type='button'
                  title='Domingo'
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='1'
                  type='button'
                  title='Segunda'
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='2'
                  type='button'
                  title='Terça'
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='3'
                  type='button'
                  title='Quarta'
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='4'
                  type='button'
                  title='Quinta'
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='5'
                  type='button'
                  title='Sexta'
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='6'
                  type='button'
                  title='Sábado'
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor='hourStart'>Qual horário do dia?</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input
                  type='time'
                  placeholder='De'
                  id='hourStart'
                  name='hourStart'
                />
                <Input
                  type='time'
                  placeholder='Até'
                  id='hourEnd'
                  name='hourEnd'
                />
              </div>
            </div>
          </div>

          <label className='mt-2 flex gap-2 text-sm items-center'>
            <Checkbox.Root
              className='w-6 h-6 p-1 rounded bg-zinc-900'
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
            >
              <Checkbox.Indicator>
                <Check className='w-4 h-4 text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close
              type='button'
              className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
            >
              Cancelar
            </Dialog.Close>
            <button
              type='submit'
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
