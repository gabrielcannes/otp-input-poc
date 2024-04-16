import { useEffect, useRef, useState } from "react";

//criado para simular o index para que nao seja chamado duas vezes handle change e handle keydown
let currentOtpIndex: number = 0;

export default function App() {
  //estado que armazena os dados do input OTP em um array[6] de string
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  //estado do index que está em foco no momento
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);

  // useRef de input para termos a referencia de cada item do array
  const inputRef = useRef<HTMLInputElement>(null);

  //recebe o target do evento e o index do input
  function handleOnChange({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void {
    //pega apenas o value do target
    const { value } = target;

    //cria um novo otp sem perder os dados do otp antigo
    const newOtp: string[] = [...otp];

    //o novo otp vai receber o último valor que colocar-mos lá
    newOtp[currentOtpIndex] = value.substring(value.length - 1);

    //se nao tiver valor volta para o quadrado anterior
    if (!value) setActiveOtpIndex(currentOtpIndex - 1);
    //do contrario vai pro proximo quadrado
    else setActiveOtpIndex(currentOtpIndex + 1);

    //coloca o novo otp como otp
    setOtp(newOtp);
  }

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const { key } = e;
    currentOtpIndex = index
    if (key === "Backspace") setActiveOtpIndex(currentOtpIndex - 1);
  };

  useEffect(() => {
    //toda vex que for trocado o index ativo trocar o foco para o proximo index
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  return (
    <div className="h-screen flex justify-center items-center space-x-2">
      {/* mapeamento do otp, como só preciso do index o primeiro valor vai com _ */}
      {otp.map((_, index) => {
        return (
          // passando uma key de index para cada input criado
          <div key={index}>
            {/* vai passar a referencia caso so index ativo seja o index que esta sendo visto */}
            <input
              ref={index === activeOtpIndex ? inputRef : null}
              type="number"
              className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl
              border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition spin-button-none"
              onChange={handleOnChange}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              value={otp[index]}
            />
          </div>
        );
      })}
    </div>
  );
}
