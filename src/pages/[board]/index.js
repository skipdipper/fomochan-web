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

// hack pass parent state as prop
function Threads({ data, setData }) {
    // const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    // function handleSearch(data) {
    //     setData(data);
    // }

    // [] no depencency only runs on first render 
    useEffect(() => {
        console.log('useEffect fetching threads ran')
        setLoading(true)
        // fetch('http://localhost:3001/a/threads')
        //fetch('http://140.238.206.232/api/a/threads')
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
    useMaintainScroll();

    if (isLoading) return <p>Loading...</p>
    // console.log(data);
    if (!data) return <p>Unexpected server error</p>
    if (!data.length) return <p>Board has no threads</p>

    // console.log('Received:' + data[0].comment);
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
                width={thread.width}
                height={thread.height}
                thread_id={thread.thread_id}
                // replies={thread.replies}
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

    // hack
    const [data, setData] = useState(null);

    const [isHidden, setIsHidden] = useState(true);

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

    return (
        <>
            {/* Nav inside Layout component*/}
            {/* <Navbar /> */}

            {/* Header */}
            <h1>/{boardData}</h1>

            <div id="toggle-post-form-btn">
                <button onClick={onClick}>Start a New Thread</button>
            </div>
            {
                !isHidden && <ThreadForm />
            }

            {/* <ThreadForm /> */}

            <div id="control-bar">
                {/* <SearchForm /> */}
                <SearchForm
                    data={data}
                    setData={setData}
                />

                <Link href={`/${boardData}/catalog`}>
                    <a>[catalog]</a>
                </Link>
            </div>



            {/* <Threads /> */}
            <Threads
                data={data}
                setData={setData}
            />


            {/* Footer */}
        </>
    )
}

