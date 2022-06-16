import { useState } from "react"



export default function BookmarkDeleteBtn({ postid, handleRemove }) {
    const [success, setSuccess] = useState(null)


    async function deleteBookmark() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/bookmark/${postid}`, {
                method: 'DELETE',
            });

            // valid answer
            console.log(response);

            if (response.status == 200) {
                setSuccess(true);

                // remove from ui
                handleRemove(postid);

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
                deleteBookmark();
            }}> Delete</button>
        </>
    )
}