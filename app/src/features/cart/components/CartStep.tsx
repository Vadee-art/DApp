type CartStepsProps = {
  step: 'shipping' | 'review' | 'payment';
};

export const CartSteps = ({ step }: CartStepsProps) => {
  return (
    <div className="flex flex-1 items-start gap-4 font-extralight">
      <div className={step === 'shipping' ? 'text-teal-500 underline underline-offset-4' : ''}>
        Shipping
      </div>
      <div className={step === 'review' ? 'text-teal-500 underline underline-offset-4' : ''}>
        Review
      </div>
      <div className={step === 'payment' ? 'text-teal-500 underline underline-offset-4' : ''}>
        Payment
      </div>
    </div>
  );
};
