import * as Dialog from "@radix-ui/react-dialog";

import { GameController } from "phosphor-react";
import { LabelInfo } from "./LabelInfo";

export interface DuoCardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConnect: (id: string) => void;
}

export function GameCard({ data, onConnect }: Props) {
  return (
    <div className='w-56 bg-[#2A2634] rounded-lg p-5 mr-4 flex flex-col items-center flex-shrink-0'>
      <LabelInfo
        label='Nome'
        value={data.name}
      />
      <LabelInfo
        label='Tempo de jogo'
        value={`${data.yearsPlaying} anos`}
      />
      <LabelInfo
        label='Disponibidade'
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <LabelInfo
        label='Chamada de áudio?'
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={data.useVoiceChannel ? "text-emerald-400" : "text-red-400"}
      />

      <Dialog.Trigger
        className='w-full h-9 rounded-md bg-violet-500 flex items-center justify-center hover:bg-violet-600 transition-colors'
        onClick={() => onConnect(data.id)}
      >
        <GameController
          size={20}
          className='text-white'
        />
        <span className='text-white font-semibold ml-2'>Conectar</span>
      </Dialog.Trigger>
    </div>
  );
}
