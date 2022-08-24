import { useState, useRef } from "react"
import { useRouter } from 'next/router';

import Dropzone from "./Dropzone";

// multipart/form-data
export default function PostForm({ form }) {
    // const form = useRef(null);

    const router = useRouter();
    const { board, threadNo } = router.query;

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) return;

        const formData = new FormData(form.current);
        // The Thread that is being replied to  
        formData.append('thread_id', threadNo);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${board}/post`, {
                method: 'POST',
                body: formData
                // 'Content-Type': 'multipart/form-data'
            });

            // reload page
            //router.reload(window.location.pathname)

            console.log(response);
        } catch (error) {
            console.log(error);
        }

    }

    function validateForm() {
        const { comment, file } = form.current;

        if (comment.value == "" && file.files.length == 0) {
            alert("Please reply with a comment or attachment");
            return false;
        }
        return true;
    }

    return (
        <form ref={form} onSubmit={handleSubmit} encType="multipart/form">
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                placeholder="anonymous"
                id="name"
            />

            <label htmlFor="comment">Comment</label>
            <textarea
                name="comment"
                cols="48"
                rows="4"
                id="comment"
            ></textarea>

            <label htmlFor="file">File</label>
            <input
                type="file"
                name="file"
                id="file"
                accept="image/png image/jpeg"
                multiple
            />

            <input type="submit" value={`post`} />
        </form>
    )
}