import Link from 'next/link'
import { useContext } from "react"
import { UserContext } from '../../common/context/UserContext'


function Navbar() {

    const { user, setUser } = useContext(UserContext);

    return (
        <nav>

            <div>
                {'[ / '}
                <Link href='/a' scroll={false}>
                    <a>a</a>
                </Link>
                {' / '}
                <Link href='/v'>
                    <a>v</a>
                </Link>
                {' / '}
                <Link href='/g'>
                    <a>g</a>
                </Link>
                {'/ ]'}
            </div>

            <div>
                <Link href="/">
                    <a>home</a>
                </Link>

                <Link href='/faq'>
                    <a>faq</a>
                </Link>
            </div>

            <div>
                {user
                    ? <>
                        <Link href="/user/dashboard">
                            <a>dashboard</a>
                        </Link>

                        <Link href="/">
                            <a onClick={e => {
                                // e.preventDefault()
                                setUser(null);
                                fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/logout`);

                            }}>logout</a>
                        </Link>

                    </>
                    : <>
                        <Link href="/login">
                            <a>login</a>
                        </Link>

                        <Link href="/signup">
                            <a>signup</a>
                        </Link>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar;