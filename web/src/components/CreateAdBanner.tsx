import * as Dialog from "@radix-ui/react-dialog";

import { MagnifyingGlassPlus } from "phosphor-react";

export function CreateAdBanner() {
  return (
    <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8 mx-11'>
      <div className='bg-[#2a2634] px-8 py-6 flex justify-between items-center flex-col md:flex-row'>
        <div className='mb-4 md:mb-0'>
          <strong className='text-xl text-white font-black block text-center md:text-2xl md:text-start'>
            Não encontrou seu duo
          </strong>
          <span className='text-zinc-400 block text-center md:text-start'>
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <Dialog.Trigger className='py-1 px-2 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center gap-3 md:py-3 md:px-4'>
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
}
