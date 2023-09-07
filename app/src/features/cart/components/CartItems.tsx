import { XMarkIcon } from "@heroicons/react/24/outline";
import { useGetCart } from "../api/getCart";
import { useDeleteArtworkFromCart } from "../api/deleteArtworkFromCart";
import PulseLoader from "react-spinners/PulseLoader";
import { Alert } from "@/components/Elements/Alert";

export const CartItems = () => {
  const { data: cart, isLoading: cartLoading, error: cartError } = useGetCart();
  const { mutateAsync: removeCartItem, isLoading: removeCartItemLoading } = useDeleteArtworkFromCart();

  if (cartLoading) {
    return <CartItemsSkeleton />;
  }

  if (cartError) {
    return <Alert variant="danger" dissmissible={false}> Error loading cart items </Alert>
  }

  return (
    <div className="relative p-4 border">
      {removeCartItemLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <PulseLoader size={12} color={'#000000'} />
        </div>
      )}
      {cart?.artworks.map((artwork) => (
        <div className="flex flex-row gap-4 mb-2 border-b">
          <div>
            <img src={artwork.imageMediumQuality} alt={artwork.title} className="w-32 h-32 object-cover object-center" />
          </div>
          <div className="flex flex-col flex-1 justify-between">
            <div className="flex">
              <div className="flex flex-col flex-1">
                <span className="font-normal">{artwork.artist.name}</span>
                <span className="font-extralight text-sm">{artwork.title}</span>
              </div>
              <div className="flex items-start cursor-pointer" onClick={async () => {
                await removeCartItem({artworkId: artwork.Id});
              }}>
                <XMarkIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
              </div>
            </div>
            <div className="font-normal flex justify-between">
              <span> Price: </span>
              <span> {artwork.price}$ </span>
            </div>
          </div>
        </div>
      ))}
      {cart?.artworks.length === 0 && (
        <div className="flex flex-col items-center justify-center h-32">
          <span className="font-extralight text-sm"> Your cart is empty </span>
        </div>
      )}
    </div>
  )
}

const CartItemsSkeleton = () => {
  return (
    <div className="animate-pulse p-4 border">
      {[1, 2].map((_) => (
        <div className="flex flex-row gap-4 mb-2">
          <div>
            <div className="w-32 h-32 bg-gray-200"></div>
          </div>
          <div className="flex flex-col flex-1 justify-between">
            <div className="flex">
              <div className="flex flex-col flex-1">
                <div className="w-32 h-4 bg-gray-200 mb-2"></div>
                <div className="w-32 h-4 bg-gray-200"></div>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-gray-200"></div>
              </div>
            </div>
            <div className="font-normal flex justify-between">
              <div className="w-16 h-4 bg-gray-200"></div>
              <div className="w-8 h-4 bg-gray-200"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}