import { useRef, useState } from "react"

//application/json instead of application/x-www-form-urlencoded
export default function SignupForm() {
    const form = useRef(null);
    const [success, setSuccess] = useState(null)


    async function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = form.current;
        console.log(`email: ${email.value}, password: ${password.value}`);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            });

            if (response.status == 201) {
                setSuccess(true);
            } else {
                setSuccess(false);
            }

            console.log(response);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <form ref={form} onSubmit={handleSubmit} >
                <label htmlFor="signup-email">email</label>
                <input
                    type="email"
                    name="email"
                    id="signup-email"
                    required
                />

                <label htmlFor="signup-password">password</label>
                <input
                    type="password"
                    name="password"
                    minLength="8"
                    id="signup-password"
                    required
                />

                <input type="submit" />
            </form>

            {
                success == true && <div>Account created. You can now login or verify via email</div>
            }

            {
                success == false && <div>Failed to create an account. Please try again</div>
            }
        </>

    )


}