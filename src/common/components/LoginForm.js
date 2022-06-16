import { useRef, useState, useEffect, useContext } from "react"
import { useRouter } from 'next/router';
import Link from 'next/link'

import { UserContext } from '../context/UserContext'

//application/json instead of application/x-www-form-urlencoded
export default function LoginForm() {
    const form = useRef(null);
    const router = useRouter();

    // const [user, setUser] = useState('');
    const { user, setUser } = useContext(UserContext);
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        console.log('use effect ran');

        if (typeof window !== 'undefined') {
            console.log(`cookies: ${document.cookie}`);
            if (document.cookie) {
                console.log('tried to login via remember me')

                fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        // email: email.value,
                        // password: password.value,
                        // rememberMe: rememberMe.checked
                    })
                }).then((response) => {
                    if (response.status == 200) {
                        // setUser()

                        response.json().then((data) => {
                            setUser(data);
                            router.push('/user/dashboard');


                        }).catch((err) => {
                            console.log(err);
                            console.log('failed to login via remember me');

                        });

                        // router.push('/user/dashboard');
                    }
                })
                    .catch((err) => {
                        console.log(err);
                        console.log('failed to login via remember me');

                    });
            }
        }


        // sessionStorage.setItem('email', user.toString());
        sessionStorage.setItem('email', user ? user.email : '');
    }, [user]);



    async function handleSubmit(e) {
        e.preventDefault();
        const { email, password, rememberMe } = form.current;
        console.log(`email: ${email.value}, password: ${password.value}, remember me: ${rememberMe.checked}`);

        try {
            // const response = await fetch('http://localhost:3001/user/login', {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                    rememberMe: rememberMe.checked
                })
            });

            console.log(response);

            if (response.status == 200) {
                // router.push('/user/dashboard');

                // uncomment this
                // setUser(email.value);



                const decoded = await response.json();
                console.log(`logging the response: ${decoded.user.email}`);
                setUser(decoded.user);


                setSuccess(true);
                // router.push('/user/profile');
                router.push('/user/dashboard');

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
                <label htmlFor="email">email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                />

                <label htmlFor="password">password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    required
                />

                <label htmlFor="rememberMe">remember me</label>
                <input
                    type="checkbox"
                    name="rememberMe"
                    // value={true}
                    id="rememberMe"
                />

                <input type="submit" value={`login`} />

                <div>
                    <Link href="/user/password-reset">
                        <a>Forget your password? </a>
                    </Link>
                </div>
            </form>

            {
                success == false && <div > Incorrent email or password. Please try again</div>
            }

        </>
    )
}
