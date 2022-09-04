import Error from 'next/error'

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SWRConfig } from 'swr'

import PostList from '../../../common/components/PostList';
import PostForm from '../../../common/components/PostForm';
import Dropzone from '../../../common/components/Dropzone';
import BookmarkAddBtn from '../../../common/components/BookmarkAddBtn';
import ThreadDeleteBtn from '../../../common/components/ThreadDeleteBtn';
import ThreadControls from '../../../common/components/ThreadControls';
import ThreadStats from '../../../common/components/ThreadStats';


export default function ThreadPage({ fallbackData, errorCode }) {
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
            <Head>
                <title>{`/${board}/ - ${fallbackData[0].subject}`}</title>
            </Head>

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

            <ThreadControls autoUpdate={autoUpdate} handleAutoUpdate={handleAutoUpdate} />

            <SWRConfig value={{ fallbackData }}>
                <ThreadStats />
                <PostList
                    form={form}
                    autoUpdate={autoUpdate}
                />
            </SWRConfig>

            <div id='bottom'></div>
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

