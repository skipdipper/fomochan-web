import Error from 'next/error'
import { useState, useEffect } from 'react';

import useFetch from '../../common/hooks/useFetch';
import Card from '../../common/components/Card'
import ThreadList from '../../common/components/ThreadList';


export default function Catalog({ errorCode, data: threads, board }) {

    if (errorCode) {
        return <Error statusCode={errorCode} />
    }

    return (
        <>
            <h1>Catalog</h1>
            <ThreadList data={threads} catalog={true} />
        </>
    )
}


export async function getServerSideProps(context) {
    const { board } = context.params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${board}/threads`);
    const errorCode = res.ok ? false : res.status
    const data = await res.json();

    console.log(`getServerSideProps for Catalog Board /${board}`);
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { errorCode, data, board },
    }
}