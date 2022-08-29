import useSWR from 'swr'
import { useRouter } from 'next/router';

const fetcher = async url => {
    const res = await fetch(url);
    console.log('fetching thread...');

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.');
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    return res.json();
}

export default function useThread(ssr = false, options = {}) {
    const router = useRouter();
    const { board, threadNo } = router.query;

    // https://github.com/vercel/next.js/discussions/14657
    // https://dev.to/wh1zk1d/swr-dynamic-routes-in-next-js-3cbl

    // conditional fetch when router.isReady, board and threadNo param not null
    // or not initial SSR
    const { data, error } = useSWR((board && threadNo && !ssr)
        ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${board}/thread/${threadNo}` : null,
        fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        ...options
    });

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}