import Card from '../../common/components/Card'
import { useState, useEffect } from 'react';
import useFetch from '../../common/hooks/useFetch';


// hack pass parent state as prop
function Threads() {
    const {data, isLoading, error} = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/a/threads`, {});

    // call Main scroll position hook
    // useMaintainScroll();

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Unexpected server error</p>
    if (!data) return <p>Board has no threads</p>

    const threads = data.map((thread) =>
        <div className='catalog-item' key={thread.post_id}>
            <Card
                subject={thread.subject}
                name={thread.name}
                created_at={thread.created_at}
                post_id={thread.post_id}
                comment={thread.comment}
                filesize={thread.filesize}
                filename={thread.filename}
                width={thread.width}
                height={thread.height}
                thread_id={thread.thread_id}
                replies={thread.replies}
                images={thread.images}
                tim={thread.tim}
                // op={true}

            />
        </div>
    )

    return (
        <div className='catalog'>
            {threads}
            {console.log('finished rendering threads')}
        </div>
    )

}

export default function Catalog({ url }) {

    // const router = useRouter();
    // const { threadNo } = router.query;

    return (
        <>
            <h1>Catalog</h1>
            <Threads/>
        </>
    )
}