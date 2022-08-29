import { useState, useEffect, useRef } from 'react';

/**
 * Countdown timer running every second
 */
export default function Countdown() {
    const fetchInterval = useRef(10);
    const [counter, setCounter] = useState(10);

    useEffect(() => {
        if (counter == 0) {
            // refetch api here for UI synchronisation?
            // mutate(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${board}/thread/${threadNo}`);

            // reset fetch interval
            setTimeout(() => setCounter(fetchInterval.current), 1000);
        }
        else if (counter > 0) {
            setTimeout(() => setCounter(counter - 1), 1000);
        }
    }, [counter])

    return (
        <span>
            {counter ? counter : 'updating...'}
        </span>
    )
}