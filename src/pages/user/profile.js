import { useState, useRef } from "react"


export default function Profile() {


    const form = useRef(null);

    let email = '';
    // This might be rendered on node server first
    if (typeof window !== 'undefined') {
        email = sessionStorage.getItem('email');
    }

    async function handleSubmit(e) {
        e.preventDefault();

        let email = '';
        // This might be rendered on node server first
        if (typeof window !== 'undefined') {
            email = sessionStorage.getItem('email');
        }

        const formData = new FormData(form.current);
        formData.append('email', email);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/update`, {
                // method: 'PATCH',
                method: 'POST',
                body: formData
                // 'Content-Type': 'multipart/form-data'
            });

            console.log(response);
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>
            <h1>Profile</h1>
            <form ref={form} onSubmit={handleSubmit} encType="multipart/form">

                <label htmlFor="pfp">Upload Profile Picture</label>
                <input
                    type="file"
                    name="pfp"
                    id="pfp"
                    accept="image/png image/jpeg"
                />

                <label htmlFor="background">Upload Profile Background</label>
                <input
                    type="file"
                    name="background"
                    id="background"
                    accept="image/png image/jpeg"
                />
                {/* <label htmlFor="newEmail">Email</label>
                <input
                    type="newEmail"
                    name="newEmail"
                    id="newEmail"
                /> */}

                {/* <input type="submit" /> */}
                <button type="submit"> Save Changes </button>

            </form>
        </>
    )
}