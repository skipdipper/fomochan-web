import { useState, useEffect } from "react"

export default function BookmarkAddBtn({ email, id }) {
    const [success, setSuccess] = useState(null)


    async function addBookmark() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/bookmark`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    id: id
                })
            });

            // valid answer
            console.log(response);

            if (response.status == 201) {
                setSuccess(true);
                console.log('Added thread to bookmarks');
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
                addBookmark();
            }}> Bookmark</button>
        </>
    )
}