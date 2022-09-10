import { useState, useEffect, useRef } from 'react';

export default function useFetch(url, options, deps = []) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            console.log('Fetching Data');
            setError(false);
            setIsLoading(true);

            try {
                const res = await fetch(url, { ...options, signal });

                if (!res.ok) {
                    throw new Error(res.statusText)
                }

                const json = await res.json();
                setData(json);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log('Fetch request aborted');
                } else {
                    setError(true);
                }

            } finally {
                setIsLoading(false);
            }
        }

        fetchData();

        return () => controller.abort();
    }, deps);

    return { data, isLoading, error };
}