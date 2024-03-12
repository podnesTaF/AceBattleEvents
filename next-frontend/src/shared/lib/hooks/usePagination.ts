"use client";

import { useState } from "react";

interface UsePaginationProps {
  initialPage?: number;
  pageSize?: number;
  totalItems?: number;
}

interface UsePaginationReturn {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  setPage: (page: number) => void;
  setTotalItems: (total: number) => void;
}

export const usePagination = ({
  initialPage = 1,
  pageSize = 10,
  totalItems = 0,
}: UsePaginationProps): UsePaginationReturn => {
  const [page, setPage] = useState(initialPage);
  const [currentTotalItems, setTotalItems] = useState(totalItems);

  const totalPages = Math.ceil(currentTotalItems / pageSize);

  return {
    page,
    pageSize,
    totalItems: currentTotalItems,
    totalPages,
    setPage,
    setTotalItems,
  };
};
