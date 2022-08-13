import Link from 'next/link'

import { getAllBoards } from '../../api/services/board'
import useSWR from 'swr'
import { useState, useEffect } from 'react';

import { useRouter } from "next/router"

import Post from '../../common/components/Post'
import Catalog from '../../modules/Catalog'
import ThreadForm from '../../common/components/ThreadForm';
import SearchForm from '../../common/components/SearchForm';

import useMaintainScroll from '../../common/hooks/useMaintainScroll';
import useFetch from '../../common/hooks/useFetch';

export async function getStaticPaths() {
    // Return a list of possible values for board title

    //paths = await getAllBoards();

    const paths = [
        {
            params: {
                board: 'a'
            }
        },
        {
            params: {
                board: 'v'
            }
        },
        {
            params: {
                board: 'g'
            }
        }

    ]


    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the board
    const boardData = params.board;
    return {
        props: {
            boardData
        }
    }
}


function Threads({ data }) {
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
                replies={thread.replies}
                images={thread.images}
                tim={thread.tim}
                op={true}

            />
        </div>
    )

    return (
        <div className='board'>
            {threads}
            {console.log('finished rendering threads')}
        </div>
    )

}

export default function Board({ boardData }) {

    const { data: threads, isLoading, error } = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/a/threads`, {});
    const [isHidden, setIsHidden] = useState(true);
    //     useMaintainScroll();

    const onClick = () => setIsHidden(!isHidden);

    if (typeof window !== 'undefined') {
        if (sessionStorage.scrollPosition) {
            console.log(`restoring previous scroll position: ${sessionStorage.scrollPosition} scrolling...`);
            window.scrollTo({
                top: sessionStorage.scrollPosition,
                left: 0,
                behavior: 'auto'
            });
        }
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Unexpected server error</p>
    if (!threads) return <p>Board has no threads</p>

    return (
        <>
            {/* Nav inside Layout component*/}
            <h1>/{boardData}</h1>

            <div id="toggle-post-form-btn">
                <button onClick={onClick}>Start a New Thread</button>
            </div>
            {
                !isHidden && <ThreadForm />
            }

            {/* <ThreadForm /> */}

            <div id="control-bar">
                {/* <SearchForm
                    data={data}
                    setData={setData}
                /> */}

                <Link href={`/${boardData}/catalog`}>
                    <a>[catalog]</a>
                </Link>
            </div>

            <Threads
                data={threads}
            // setData={setData}
            />
        </>
    )
}

