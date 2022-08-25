import Link from 'next/link'
import Error from 'next/error'

import { getAllBoards } from '../../api/services/board'
import useSWR from 'swr'
import { useState } from 'react';

import ThreadList from '../../common/components/ThreadList';
import ThreadForm from '../../common/components/ThreadForm';
import SearchForm from '../../common/components/SearchForm';

import useMaintainScroll from '../../common/hooks/useMaintainScroll';


export default function Board({ errorCode, data: threads, board }) {

    const [isHidden, setIsHidden] = useState(true);
    //     useMaintainScroll();

    const onClick = () => setIsHidden(hidden => !hidden);

    if (errorCode) {
        return <Error statusCode={errorCode} />
    }

    if (!threads.length) return <div>Board has no threads</div>

    return (
        <>
            <h1 id="board-title">/{board}</h1>

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

                <Link href={`/${board}/catalog`}>
                    <a>[catalog]</a>
                </Link>
            </div>

            <ThreadList data={threads} />
        </>
    )
}


export async function getServerSideProps(context) {
    const { board } = context.params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${board}/threads`);
    const errorCode = res.ok ? false : res.status
    const data = await res.json();

    console.log(`getServerSideProps for Board /${board}`);
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { errorCode, data, board },
    }
}