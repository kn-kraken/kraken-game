type Props = {
  message?: string;
};

export default function Angel({ message }: Props) {
  return (
    <div className="w-64 h-64 absolute right-0 top-8 flex items-center justify-center">
      <div className="relative">
        <img src="/a1.svg" alt="aniol" className="w-50 h-50 object-contain" />
      </div>
    </div>
  );
}
