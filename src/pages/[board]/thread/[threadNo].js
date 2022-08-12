import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import Post from '../../../common/components/Post'
import PostForm from '../../../common/components/PostForm';

import Dropzone from '../../../common/components/Dropzone';
import BookmarkAddBtn from '../../../common/components/BookmarkAddBtn';
import ThreadDeleteBtn from '../../../common/components/ThreadDeleteBtn';

import { ThreadContext } from '../../../common/context/ThreadContext';

function Posts({ form }) {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const router = useRouter();
    const { threadNo } = router.query;

    useEffect(() => {
        console.log('use effect ran');
        if (router.isReady) {
            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/a/thread/${threadNo}`)
                .then((res) => res.json())
                .then((data) => {
                    setData(data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }

    }, [router.isReady]);

    if (isLoading) return <p>Loading...</p>
    // console.log(data);
    if (!data) return <p>Unexpected server error</p>
    if (!data.length) return <h1>Thread does not Exist</h1>

    const threads = data.map((thread) =>
        <div className='thread' key={thread.post_id}>
            <Post
                subject={thread.subject}
                name={thread.name}
                created_at={thread.created_at}
                post_id={thread.post_id}
                comment={thread.comment}
                filesize={thread.filesize}
                filename={thread.filename}
                ext={thread.ext}
                width={thread.width}
                height={thread.height}
                thumbnailWidth={thread.thumbnail_w}
                thumbnailHeight={thread.thumbnail_h}
                thread_id={thread.thread_id}
                // replies={thread.replies}
                reply_to={thread.thread_id == 0 ? thread.last_replies : thread.replies}

                images={thread.images}
                tim={thread.tim}

                // prop drilling level 1
                form={form}
            />
        </div>
    )

    return (
        <div className='board'>
            <ThreadContext.Provider value={data}>
                {threads}
            </ThreadContext.Provider>
        </div>
    )

}

export default function Thread() {

    const router = useRouter();
    const { threadNo } = router.query;

    // hack
    const form = useRef(null);

    let email = '';
    if (typeof window !== 'undefined') {
        email = sessionStorage.getItem('email');
    }


    return (
        <>
            <h1>This is a thread No. {threadNo}</h1>
            <PostForm
                form={form}

            />

            {email &&
                <div className='user-controls'>
                    <BookmarkAddBtn
                        id={threadNo}
                        email={email}
                    />

                    <ThreadDeleteBtn
                        id={threadNo}
                    />
                </div>
            }

            <Posts
                form={form}
            />
        </>
    )
}