"use client";

import { Dispatch, SetStateAction, useRef, useCallback } from "react";
import { InfiniteData } from "@tanstack/react-query";
import Card from "./Card";
import Image from "next/image";
import AdComponent from "./GoogleAdComponent";

interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface ContentContainerProps {
  data: InfiniteData<Cat[]> | undefined;
  isFetching: boolean;
  hasNextPage: boolean;
  setHasAutoFetchLimitReached: Dispatch<SetStateAction<boolean>>;
  fetchNextPage: () => void;
}

interface MapAdsToResultProps {
  data: InfiniteData<Cat[]> | undefined;
}

const placeholderItems = 24;

const ContentContainer: React.FC<ContentContainerProps> = ({
  data,
  isFetching,
  hasNextPage,
  setHasAutoFetchLimitReached,
  fetchNextPage,
}) => {
  const observerElem = useRef<IntersectionObserver | null>();

  const loadMoreRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching || !hasNextPage) return;
      if (observerElem.current) observerElem.current.disconnect();
      observerElem.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerElem.current.observe(node);
    },
    [isFetching, fetchNextPage, hasNextPage]
  );

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
      <MapAdsToResult data={data} />
      {isFetching &&
        Array.from({ length: placeholderItems }).map((_, index) => (
          <Card key={index}>
            <div className="animate-pulse bg-gray-200 min-h-96 h-full" />
          </Card>
        ))}
      <div className="flex col-span-full justify-center inset-x-0 bottom-4">
        {!hasNextPage && !isFetching && (
          <button
            onClick={() => setHasAutoFetchLimitReached(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            More Results
          </button>
        )}
      </div>
      <div ref={loadMoreRef} className="col-span-full"></div>
    </section>
  );
};

const MapAdsToResult: React.FC<MapAdsToResultProps> = ({ data }) => {
  return data?.pages?.flatMap((page) =>
    page?.map(({ id, width, height, url }, index) => {
      const isThirdIndex = index === 2;
      const elementsArray = [
        <Card key={id}>
          <Image
            key={id}
            width={width}
            alt={`Cat with an id: ${id}`}
            unoptimized
            priority
            height={height}
            src={url}
            className="w-full h-full object-cover"
          />
        </Card>,
      ];
      if (isThirdIndex) {
        elementsArray.push(
          <Card key={`ad-container-${index}`}>
            <AdComponent
              key={`ad-id-${index}`}
              slotId={`ad-slot-${index}-${id}`}
            />
          </Card>
        );
      }

      return elementsArray;
    })
  );
};

export default ContentContainer;
