import Error from 'next/error'
import { useState, UserContext } from 'react';

import useFetch from '../../common/hooks/useFetch';
import Card from '../../common/components/Card'
import ThreadList from '../../common/components/ThreadList';
import { CatalogContext } from '../../common/context/CatalogContext';


export default function Catalog({ errorCode, data: threads, board }) {
    const [imageSize, setImageSize] = useState('small');

    if (errorCode) {
        return <Error statusCode={errorCode} />
    }

    return (
        <>
            <h1>Catalog</h1>

            <label htmlFor="image-size-select">Image Size:</label>
            <select
                name="image-size-select"
                id="image-size-select"
                defaultValue={imageSize}
                onChange={() => setImageSize(event.target.value)}
            >
                <option value="small" >Small</option>
                <option value="large">Large</option>
            </select>

            <CatalogContext.Provider value={imageSize}>
                <ThreadList data={threads} catalog={true} />
            </CatalogContext.Provider>

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