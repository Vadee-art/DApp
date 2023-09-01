import { useParams } from "react-router-dom";
import { Tab } from '@headlessui/react';
import { useGetArtist } from "../api/getArtist";
import { Alert } from "@/components/Elements/Alert";
import { Button } from "@/components/Elements";
import clsx from "clsx";
import { ArtworkCard, ArtworkCardSkeleton } from "@/features/artwork/components/ArtworkCard";

export const Artist = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetArtist({ id: +id! })

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (isLoading) {
    return <ArtistSkeleton />;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8 mt-16">
        <div className="flex-1">
            <img src={data!.photo} alt="artist photo" className="bg-gray-300 w-24 h-24 mb-4" loading="lazy"/>
            <h3 className="font-semibold">{data!.name}</h3>
            <span>{data!.origin.country}, {data!.birthday.split('-')[0]}</span>
            <Button size="sm" variant="inverse" className="w-full mt-2">Follow</Button>
            {/* TODO: show number of followers of the artist here */}
        </div>
        <div className="flex-[6]">
          <Tab.Group>
            <Tab.List className="flex space-x-4 py-1">
              {['Biography', 'Achivements', 'CV'].map((tab) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    clsx(
                      selected
                        ? 'text-gray-300'
                        : 'text-gray-500 hover:text-gray-700',
                    )
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-4">
              <Tab.Panel className={'whitespace-pre-line'}> {data!.biography} </Tab.Panel>
              <Tab.Panel> {data!.achievements} </Tab.Panel>
              <Tab.Panel className={'whitespace-pre-line'}> {data!.cv} </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-16">
        <div className="flex-1">
          <h3 className="text-gray-500">Artworks</h3>
        </div>
        <div className="flex-[6]">
          <div className="grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {isLoading ? 
              Array.from({ length: 9 }, (_, i) => <ArtworkCardSkeleton key={i} />) : 
              data!.artworks.map((artwork) => (
                <ArtworkCard key={artwork.Id} artwork={artwork} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

const ArtistSkeleton = () => {
  return (
    <div className="container mx-auto px-4 animate-pulse">
      <div className="flex flex-col md:flex-row gap-8 mt-16">
        <div className="flex-1">
            <div className="bg-gray-200 w-24 h-24 mb-4" />
            <div className="bg-gray-200 w-28 h-4 mb-2" />
            <div className="bg-gray-200 w-20 h-4 mb-2" />
            <div className="bg-gray-200 w-full h-8" />
        </div>
        <div className="flex-[6]">
          <div className="flex gap-4 mb-8">
            <div className="bg-gray-200 w-20 h-4" />
            <div className="bg-gray-200 w-20 h-4" />
            <div className="bg-gray-200 w-20 h-4" />
          </div>
          <div className="bg-gray-200 w-full h-4 mb-2" />
          <div className="bg-gray-200 w-full h-4 mb-2" />
          <div className="bg-gray-200 w-full h-4 mb-2" />
          <div className="bg-gray-200 w-full h-4 mb-2" />
          <div className="bg-gray-200 w-full h-4" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-16">
        <div className="flex-1">
          <h3 className="text-gray-500">Artworks</h3>
        </div>
        <div className="flex-[6]">
          <div className="grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {Array.from({ length: 9 }, (_, i) => <ArtworkCardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    </div>
     
  )
}