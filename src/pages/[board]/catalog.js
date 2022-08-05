import Card from '../../common/components/Card'
import { useState, useEffect } from 'react';



// hack pass parent state as prop
function Threads() {
    const [data, setData] = useState(null)

    const [isLoading, setLoading] = useState(false)

    // [] no depencency only runs on first render 
    useEffect(() => {
        console.log('useEffect fetching threads ran')
        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/a/threads`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.message)
            })

    }, [])

    // call Main scroll position hook
    // useMaintainScroll();

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>Unexpected server error</p>
    if (!data.length) return <p>Board has no threads</p>

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
            {/* <Card/> */}
            <Threads/>
        </>
    )
}