import { useState, useEffect, useCallback } from "react";

export const useInfiniteScroll = (fetchFunction, filters = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (pageNum = 1, append = false) => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchFunction(pageNum, 6, filters);

        if (append) {
          setData((prev) => [...prev, ...result.jobs]);
        } else {
          setData(result.jobs);
        }

        setHasMore(result.hasMore);
        setPage(pageNum);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [fetchFunction, filters]
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchData(page + 1, true);
    }
  }, [loading, hasMore, page, fetchData]);

  const refresh = useCallback(() => {
    setPage(1);
    setData([]);
    setHasMore(true);
    fetchData(1, false);
  }, [fetchData]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    const sentinel = document.getElementById("scroll-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [loadMore, hasMore, loading]);

  // Initial load
  useEffect(() => {
    fetchData(1, false);
  }, [fetchData]);

  return {
    data,
    loading,
    hasMore,
    error,
    loadMore,
    refresh,
  };
};

export default useInfiniteScroll;
