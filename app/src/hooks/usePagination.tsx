import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type UsePaginationResult = {
  page: number;
  setPage: (page: number) => void;
}

export const usePagination = (): UsePaginationResult => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page') ? +searchParams.get('page')! : 1);

  return { page, setPage }
}