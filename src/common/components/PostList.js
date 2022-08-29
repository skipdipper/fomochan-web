import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Post from './Post'
import { ThreadContext } from '../context/ThreadContext';
import useThread from '../hooks/useThread';

/**
 * Single Original Post and all the reply posts
 */
export default function PostList({ form, autoUpdate }) {
    const router = useRouter();
    const { board, threadNo } = router.query;

    const { data, isLoading, isError } = useThread(false, {
        refreshInterval: autoUpdate ? 11000 : 0
    });

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Unexpected server error</p>
    if (!data.length) return <h1>Thread does not Exist</h1>

    const thread = data.map((thread) =>
        <Post key={thread.post_id}
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

            form={form}
        />
    )

    return (
        <div className='thread'>
            <ThreadContext.Provider value={data}>
                {thread}
            </ThreadContext.Provider>
        </div>
    )
}