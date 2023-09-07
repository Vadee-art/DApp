import { CartItems } from '../components/CartItems';
import { CartSteps } from '../components/CartStep';

export const Shipping = () => {
  return (
    <div className="container mx-auto px-4">
      <CartSteps step="shipping" />

      <div className="mt-16 flex flex-col gap-8 md:flex-row">
        <div className="h-96 flex-[2] animate-pulse bg-gray-200"></div>
        <div className="flex-1">
          <CartItems />
        </div>
      </div>
    </div>
  );
};
