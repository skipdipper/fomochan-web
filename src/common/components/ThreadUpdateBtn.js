import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr'

export default function ThreadUpdateBtn() {
    const { mutate } = useSWRConfig();
    const router = useRouter();

    const { board, threadNo } = router.query;

    function handleUpdate() {
        console.log('updating thread ...');
        // broadcast a revalidation message globally to other SWR hooks using the same key
        // refetch thread
        mutate(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${board}/thread/${threadNo}`);
    }

    return (
        <button onClick={handleUpdate}>Update</button>
    )
}