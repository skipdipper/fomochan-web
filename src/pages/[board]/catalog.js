import Error from 'next/error'
import { useState } from 'react';

import ThreadList from '../../common/components/ThreadList';
import CatalogSettings from '../../common/components/CatalogSettings';
import { CatalogProvider } from '../../common/context/CatalogContext';


export default function Catalog({ errorCode, data: threads, board }) {
    console.log('Rendering Catalog Page');

    if (errorCode) {
        return <Error statusCode={errorCode} />
    }

    return (
        <>
            <h1>Catalog</h1>

            <CatalogProvider>
                <CatalogSettings />
                <ThreadList data={threads} catalog={true} />
            </CatalogProvider>
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