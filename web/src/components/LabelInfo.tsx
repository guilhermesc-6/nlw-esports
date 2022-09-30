interface Props {
  label: string;
  value: string;
  colorValue?: string;
}

export function LabelInfo({ label, value, colorValue = "text-white" }: Props) {
  return (
    <div className='w-full mb-4 flex flex-col'>
      <span className='text-zinc-400 mb-1 '>{label}</span>

      <span className={`font-bold ${colorValue}`}>{value}</span>
    </div>
  );
}
