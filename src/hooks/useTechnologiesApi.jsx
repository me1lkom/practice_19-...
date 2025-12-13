import { useState, useEffect, useCallback } from "react";

function useTechnologiesApi(url, options = {}) {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTechnologies = useCallback(
    async (abortConroller) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          ...options,
          signal: abortConroller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Ошибка загрузки технологий: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();
        setTechnologies(result);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Запрос отменен");
        }
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    const abortController = new AbortController();

    if (url) {
      fetchTechnologies(abortController);
    }

    return () => {
      abortController.abort();
    };
  }, [url, fetchTechnologies]);

  const refetch = useCallback(() => {
    const abortController = new AbortController(); 

    fetchTechnologies(abortController);
    return () => abortController.abort();
  }, [fetchTechnologies]);

  return {technologies, loading, error, refetch}
}

export default useTechnologiesApi;
