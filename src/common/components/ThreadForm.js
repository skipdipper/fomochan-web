import { useState, useRef } from "react"
import Dropzone from "./Dropzone";
import { useRouter } from 'next/router';

import Image from 'next/image'


export default function ThreadForm() {
    const form = useRef(null);
    const router = useRouter();
    const { board } = router.query;

    // capture loaded
    const [captchaId, setCatpchaId] = useState(null);


    const [dropFile, setDropFile] = useState(null);
    function handleDropFile(file) {
        setDropFile(file);
        console.log('uploading drop file...');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(form.current);

        // require the uuid of captcha
        formData.append('captchaId', captchaId);


        const { captchaAns } = form.current;
        console.log(`enterd captcha answer: ${captchaAns.value}`);

        // submitCaptchaAns(captchaAns.value);

        // Files from dropzone
        if (dropFile) {
            console.log('Drop file attached');
            formData.append('file', dropFile);
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${board}/thread`, {
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

    async function loadCaptcha() {
        // let captchaId = null;
        // e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_CAPTCHA_ENDPOINT}/v2/captcha`, {
                method: 'POST',
                body: JSON.stringify({ level: "hard", media: "image/png", "input_type": "text", size: "350x100" })
            });
            console.log(response);


            const captcha = await response.json();
            console.log(captcha);
            if (response.ok) {
                console.log(captcha);
                // captchaId = result.id;

                setCatpchaId(captcha.id);
                console.log('captcha id set');
            } else {
                console.log('failed to get captcha');
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function submitCaptchaAns(captchaAns) {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_CAPTCHA_ENDPOINT}/v2/answer`, {
                method: 'POST',
                body: JSON.stringify({ id: captchaId, answer: captchaAns })
            });
            console.log(response);


            const verified = await response.json();
            console.log(verified);
            if (response.ok && verified.result == 'True') {
                console.log(verified);

                console.log('Captcha verified');
            } else {
                console.log('Failed to verify Captcha');
            }

        } catch (error) {
            console.log(error);
        }
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

            <label htmlFor="subject">Subject</label>
            <input
                type="text"
                name="subject"
                id="subject"
            />

            <label htmlFor="comment">Comment</label>
            <textarea
                name="comment"
                cols="48"
                rows="4"
                id="comment"
            ></textarea>

            <label htmlFor="captchaAns">Verification</label>
            <div>
                <button type="button" onClick={loadCaptcha}>Get Catchpa</button>
                <input
                    type="text"
                    name="captchaAns"
                    id="captchaAns"
                    required
                />
                {

                    captchaId &&
                    <div>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_CAPTCHA_ENDPOINT}/v2/media?id=${captchaId}`}
                            width={350}
                            height={100}
                            alt='Captcha image'
                        />
                    </div>
                }
            </div>

            <label htmlFor="file">File</label>
            <input
                type="file"
                name="file"
                id="file"
                accept="image/png image/jpeg"
                multiple
            />

            <input type="submit" value={`post`} />

            {/* <div>
                <p className="title">Drag and Drop Image Upload</p>
                <div className="content">
                    <Dropzone handleDropFile={handleDropFile} />
                </div>
            </div> */}

        </form>
    )
}

