import Link from 'next/link'

import { getAllBoards } from '../../api/services/board'
import useSWR from 'swr'
import { useState, useEffect } from 'react';

import { useRouter } from "next/router"

import ThreadList from '../../common/components/ThreadList';
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


export default function Board({ boardData }) {
    const { data: threads, isLoading, error } = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${boardData}/threads`, {}, [boardData]);

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

            <ThreadList data={threads} />
        </>
    )
}

