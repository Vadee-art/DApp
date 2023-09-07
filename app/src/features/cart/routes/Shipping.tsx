import { CartItems } from '../components/CartItems';
import { CartSteps } from '../components/CartStep';

export const Shipping = () => {
  return (
    <div className="container mx-auto px-4">
      <CartSteps step="shipping" />

      <div className="flex flex-col md:flex-row gap-8 mt-16">
        <div className="flex-[2] bg-gray-200 animate-pulse h-96"></div>
        <div className="flex-1">
          <CartItems />
        </div>
      </div>
    </div>
  );
};
