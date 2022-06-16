import { useRef, useState, useEffect } from "react"
import { useRouter } from 'next/router';


export default function PasswordRest() {
    const form = useRef(null);
    const router = useRouter();
    const [success, setSuccess] = useState(null)


    const { token, id } = router.query;
    console.log(`token: ${token} id: ${id}`);

    async function handleSubmit(e) {
        e.preventDefault();
        const { password } = form.current;
        console.log(`new password: ${password.value}`);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/reset-password-verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: token,
                    user_id: id,
                    password: password.value,
                })
            });

            // valid answer
            console.log(response);

            if (response.status == 200) {
                setSuccess(true);
                console.log('New Password Set!');
            } else {
                setSuccess(false);
                console.log('Reset failed');
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <h2>Make a new Password</h2>
            <form ref={form} onSubmit={handleSubmit} >
                <label>
                    New password
                    <input
                        type="password"
                        name="password"
                        minLength="8"
                        required
                    />
                </label>
                <input type="submit" />

            </form>

            {
                success == true && <div>Password has been reset. You can now login with your new password</div>
            }

            {
                success == false && <div>Password reset failed. The link has expired</div>
            }
        </>
    )
}