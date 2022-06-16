import { useState, useEffect } from "react"


// function ThreadDeleteBtn({ postid, handleRemove }) {
export default function ThreadDeleteBtn({ id }) {

    const [success, setSuccess] = useState(null)


    async function deleteThread() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/a/thread/${id}`, {
                method: 'DELETE',
            });

            // valid answer
            console.log(response);

            if (response.status == 200) {
                setSuccess(true);

                console.log('Deleted thread from bookmarks');
            } else {
                setSuccess(false);
            }
        } catch (error) {
            console.log(error);
            setSuccess(false);

        }
    }

    return (
        <>
            <button type="button" onClick={() => {
                deleteThread();
            }}> Delete</button>
        </>
    )
}