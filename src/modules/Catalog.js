import { useState, useEffect } from "react";

function Catalog(props) {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:3001/a/thread/1')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    return (
        <div>
            <h1>{data.name}</h1>
            <p>{data.comment}</p>
        </div>
    )
}

export default Catalog;