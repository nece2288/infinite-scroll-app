"use client";

import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import getCats from "./utils/getCats";
import ContentContainer from "./components/ContentContainer";

const autoFetchPageLimit = 5;

export default function Home() {
  const [hasAutoFetchLimitReached, setHasAutoFetchLimitReached] =
    useState(false); // This is used to stop auto-fetching after 5 pages
  const { data, fetchNextPage, hasNextPage, isFetching, isError } =
    useInfiniteQuery({
      queryFn: getCats,
      queryKey: ["cats"],
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (hasAutoFetchLimitReached) {
          return allPages.length + 1;
        }
        if (allPages.length < autoFetchPageLimit) {
          return allPages.length + 1;
        }
        return undefined;
      },
    });

  if (isError) return <div>Sorry There was an Error 😔</div>;

  return (
    <div className="container mx-auto">
      <header role="banner">
        <h1 className="p-5 m-4 box-decoration-slice bg-radial-top text-white text-center font-bold text-4xl rounded-lg shadow-md">
          React Cat Pictures
        </h1>
      </header>
      <ContentContainer
        data={data}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        setHasAutoFetchLimitReached={setHasAutoFetchLimitReached}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}
