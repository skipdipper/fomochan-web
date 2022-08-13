import { useState, useEffect, useRef } from 'react';

export default function useFetch(url, options, deps = []) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log('Fetching Data');
            setError(false);
            setIsLoading(true);

            try {
                const res = await fetch(url, options);

                if (!res.ok) {
                    throw new Error(res.statusText)
                }

                const json = await res.json();
                setData(json);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, deps);

    return { data, isLoading, error };
}