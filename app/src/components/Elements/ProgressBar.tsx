import clsx from 'clsx';
import { useState, useEffect } from 'react';

const variants = {
  danger: 'bg-red-500 text-white',
  secondary: 'bg-gray-500 text-white',
  success: 'bg-emerald-500 text-white',
  primary: 'bg-red-500 text-white',
  warning: 'bg-amber-500 text-white',
  info: 'bg-blue-500 text-white',
};

type ProgressBarProps = {
  duration: number; // in seconds
  reverse?: boolean;
  variant?: keyof typeof variants;
};

export const ProgressBar = ({ duration, reverse, variant = 'primary' }: ProgressBarProps) => {
  const [progress, setProgress] = useState(reverse ? 100 : 0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = reverse
          ? prevProgress - 100 / (duration * 10)
          : prevProgress + 1000 / (duration * 10);
        if ((reverse && newProgress <= 0) || (!reverse && newProgress >= 100)) {
          clearInterval(intervalId);
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [duration]);

  return (
    <div className="relative h-2 overflow-hidden w-full bg-gray-200">
      <div
        className={clsx(
          'absolute top-0 left-0 h-full transition-all duration-200 ease-linear',
          variants[variant]
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
