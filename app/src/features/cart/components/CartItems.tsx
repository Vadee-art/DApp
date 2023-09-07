import { XMarkIcon } from '@heroicons/react/24/outline';
import { useGetCart } from '../api/getCart';
import { useDeleteArtworkFromCart } from '../api/deleteArtworkFromCart';
import PulseLoader from 'react-spinners/PulseLoader';
import { Alert } from '@/components/Elements/Alert';

export const CartItems = () => {
  const { data: cart, isLoading: cartLoading, error: cartError } = useGetCart();
  const { mutateAsync: removeCartItem, isLoading: removeCartItemLoading } =
    useDeleteArtworkFromCart();

  if (cartLoading) {
    return <CartItemsSkeleton />;
  }

  if (cartError) {
    return (
      <Alert variant="danger" dissmissible={false}>
        {' '}
        Error loading cart items{' '}
      </Alert>
    );
  }

  return (
    <div className="relative border p-4">
      {removeCartItemLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <PulseLoader size={12} color={'#000000'} />
        </div>
      )}
      {cart?.artworks.map((artwork) => (
        <div className="mb-2 flex flex-row gap-4 border-b">
          <div>
            <img
              src={artwork.imageMediumQuality}
              alt={artwork.title}
              className="h-32 w-32 object-cover object-center"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex">
              <div className="flex flex-1 flex-col">
                <span className="font-normal">{artwork.artist.name}</span>
                <span className="text-sm font-extralight">{artwork.title}</span>
              </div>
              <div
                className="flex cursor-pointer items-start"
                onClick={async () => {
                  await removeCartItem({ artworkId: artwork.Id });
                }}
              >
                <XMarkIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
              </div>
            </div>
            <div className="flex justify-between font-normal">
              <span> Price: </span>
              <span> {artwork.price}$ </span>
            </div>
          </div>
        </div>
      ))}
      {cart?.artworks.length === 0 && (
        <div className="flex h-32 flex-col items-center justify-center">
          <span className="text-sm font-extralight"> Your cart is empty </span>
        </div>
      )}
    </div>
  );
};

const CartItemsSkeleton = () => {
  return (
    <div className="animate-pulse border p-4">
      {[1, 2].map((_) => (
        <div className="mb-2 flex flex-row gap-4">
          <div>
            <div className="h-32 w-32 bg-gray-200"></div>
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex">
              <div className="flex flex-1 flex-col">
                <div className="mb-2 h-4 w-32 bg-gray-200"></div>
                <div className="h-4 w-32 bg-gray-200"></div>
              </div>
              <div className="flex items-start">
                <div className="h-4 w-4 bg-gray-200"></div>
              </div>
            </div>
            <div className="flex justify-between font-normal">
              <div className="h-4 w-16 bg-gray-200"></div>
              <div className="h-4 w-8 bg-gray-200"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
