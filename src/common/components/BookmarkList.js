import { useState, useEffect, useContext } from "react"

import Post from '../../common/components/Post'
import BookmarkDeleteBtn from '../../common/components/BookmarkDeleteBtn'


export default function BookmarkList() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    function handleRemove(postid) {
        const newList = data.filter((thread) => thread.post_id !== postid);

        setData(newList);
    }

    // [] no depencency only runs on first render 
    useEffect(() => {
        console.log('use effect ran')
        setLoading(true)

        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/bookmark`)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.message)
            })

    }, [])

    if (isLoading) return <p>Loading...</p>
    // console.log(data);
    if (!data) return <p>Unexpected server error</p>
    if (!data.length) return <p>No bookmarks</p>

    console.log('Received:' + data[0].comment);
    const bookmarks = data.map((thread) =>
        <div className='thread' key={thread.post_id}>
            <Post
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
                op={true}

            />
            <BookmarkDeleteBtn
                postid={thread.post_id}
                handleRemove={handleRemove}
            />
        </div>
    )

    return (
        <div className='bookmark-list'>
            {bookmarks}
        </div>
    )

}