import Error from 'next/error'

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr'

import PostList from '../../../common/components/PostList';
import PostForm from '../../../common/components/PostForm';
import Dropzone from '../../../common/components/Dropzone';
import BookmarkAddBtn from '../../../common/components/BookmarkAddBtn';
import ThreadDeleteBtn from '../../../common/components/ThreadDeleteBtn';
import ThreadUpdateBtn from '../../../common/components/ThreadUpdateBtn';
import ThreadAutoFetchCheckbox from '../../../common/components/ThreadAutoFetchCheckbox';
import ThreadStats from '../../../common/components/ThreadStats';
import Countdown from '../../../common/components/Countdown';


export default function Thread({ fallbackData, errorCode }) {
    const [autoUpdate, setAutoUpdate] = useState(false);
    const router = useRouter();

    const { board, threadNo } = router.query;
    // hack
    const form = useRef(null);
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${board}/thread/${threadNo}`;

    let email = '';
    if (typeof window !== 'undefined') {
        email = sessionStorage.getItem('email');
    }

    function handleAutoUpdate() {
        setAutoUpdate(autoUpdate => !autoUpdate);
        console.log('checked', !autoUpdate);
    }

    if (errorCode) {
        return <Error statusCode={errorCode} />
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

            <div className='thread-controls'>
                <ThreadUpdateBtn />
                <ThreadAutoFetchCheckbox handleAutoUpdate={handleAutoUpdate} />
                {autoUpdate && <Countdown />}
            </div>

            <SWRConfig value={{ fallbackData }}>
                <ThreadStats />
                <PostList
                    form={form}
                    autoUpdate={autoUpdate}
                />
            </SWRConfig>
        </>
    )
}

export async function getServerSideProps(context) {
    const { board, threadNo } = context.params;
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${board}/thread/${threadNo}`
    const res = await fetch(url);
    const errorCode = res.ok ? false : res.status
    const data = await res.json();

    console.log(`getServerSideProps for Thread ${board}/${threadNo}`);
    if (!data) {
        return {
            notFound: true,
        }
    }

    // use fallbackData for initial data, caveat not cached in cache provider
    // and only works for first swr hook call, subsequent api requests are made
    // not confused with fallback which revalidates/fetches after the page hydratest
    // https://github.com/vercel/swr/issues/523
    // https://github.com/vercel/swr/issues/284#issuecomment-869174803
    // https://github.com/vercel/swr/pull/388
    return {
        props: {
            fallbackData: data,
            errorCode
        }
    }
}

