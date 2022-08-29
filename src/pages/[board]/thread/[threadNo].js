import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr'

import PostList from '../../../common/components/PostList';
import PostForm from '../../../common/components/PostForm';
import Dropzone from '../../../common/components/Dropzone';
import BookmarkAddBtn from '../../../common/components/BookmarkAddBtn';
import ThreadDeleteBtn from '../../../common/components/ThreadDeleteBtn';
import ThreadUpdateBtn from '../../../common/components/ThreadUpdateBtn';
import ThreadAutoFetchCheckbox from '../../../common/components/ThreadAutoFetchCheckbox';
import Countdown from '../../../common/components/Countdown';


export default function Thread() {
    const { mutate } = useSWRConfig();
    const [autoUpdate, setAutoUpdate] = useState(false);
    const router = useRouter();

    const { board, threadNo } = router.query;
    // hack
    const form = useRef(null);

    let email = '';
    if (typeof window !== 'undefined') {
        email = sessionStorage.getItem('email');
    }

    function handleAutoUpdate() {
        setAutoUpdate(autoUpdate => !autoUpdate);
        console.log('checked', !autoUpdate);
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

            <div id='thread-controls'>
                <ThreadUpdateBtn />
                <ThreadAutoFetchCheckbox handleAutoUpdate={handleAutoUpdate} />
                {autoUpdate && <Countdown />}
            </div>


            <PostList
                form={form}
                autoUpdate={autoUpdate}
            />
        </>
    )
}
