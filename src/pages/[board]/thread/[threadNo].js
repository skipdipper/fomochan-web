import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import PostList from '../../../common/components/PostList';
import PostForm from '../../../common/components/PostForm';
import Dropzone from '../../../common/components/Dropzone';
import BookmarkAddBtn from '../../../common/components/BookmarkAddBtn';
import ThreadDeleteBtn from '../../../common/components/ThreadDeleteBtn';

export default function Thread() {

    const router = useRouter();
    const { board, threadNo } = router.query;

    // hack
    const form = useRef(null);

    let email = '';
    if (typeof window !== 'undefined') {
        email = sessionStorage.getItem('email');
    }


    return (
        <>
            <h1>Thread No. {threadNo} on board {board}</h1>
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

            <PostList
                form={form}
            />
        </>
    )
}