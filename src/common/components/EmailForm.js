import { useRef, useState, useEffect } from "react"

export default function EmailForm() {
    const form = useRef(null);
    const [success, setSuccess] = useState(null)


    async function handleSubmit(e) {
        e.preventDefault();
        const { email } = form.current;
        console.log(`email: ${email.value}`);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.value,
                })
            });

            // valid answer
            console.log(response);

            if (response.status == 200) {
                setSuccess(true);
                console.log('Email sent!');
            } else {
                setSuccess(false);
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <form ref={form} onSubmit={handleSubmit} >
                <label>
                    Enter your email
                    <input
                        type="email"
                        name="email"
                        required
                    />
                </label>
                <input type="submit" />

            </form>
            {
                success == true && <div>A password reset link has been emailed</div>
            }
            {
                success == false && <div>This account does not exist. Please try again</div>
            }
        </>
    )



}