import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LottieLoader = () => {
  return (
    <div className="flex justify-center items-center h-full my-40">
      <DotLottieReact
        src="https://lottie.host/6760bee5-9298-4c04-b181-6ea13fcb25ca/D01ZENAdzS.lottie"
        loop
        autoplay
        className="w-96 h-96"
      />
    </div>
  );
};

export default LottieLoader;
