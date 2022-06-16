import { useState, useEffect, useContext } from "react"

import Image from 'next/image'
import Link from 'next/link'

import { UserContext } from '../../common/context/UserContext'

import BookmarkList from '../../common/components/BookmarkList';


export default function DashBoard() {
    // const [user, setUser] = useState(null);

    const { user, setUser } = useContext(UserContext);



    const [isLoading, setLoading] = useState(false);

    let email = '';
    // This might be rendered on node server first
    if (typeof window !== 'undefined') {
        email = sessionStorage.getItem('email');
    }

    console.log(`session storage: ${email}`);



    // [] no depencency only runs on first render 
    useEffect(() => {
        console.log('use effect ran')
        setLoading(true)
        // fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/profile/${user.email}`)
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/profile/${email}`)


            .then((res) => res.json())
            .then((data) => {
                setUser(data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.message)
            })

    }, []) //[user]


    return (
        <>
            <h1>Dash Board</h1>
            <h2>{user != null && user.verified ? 'Verified User' : 'Not Verified'} </h2>

            <div>
                <Link href="/user/profile">
                    <a>Update Profile</a>
                </Link>
            </div>

            {user != null && user.background &&
                <div className="background">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/img/${user.background}`}
                        width={400}
                        height={100}
                        // layout="fill"
                        alt="user background picture"
                    />
                </div>

            }

            {user != null && user.pfp &&
                <div className="pfp">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/img/${user.pfp}`}
                        width={125}
                        height={95}
                        // layout="fill"
                        alt="user profile picture"
                    />
                </div>

            }

            <div>
                <h2>Bookmarks</h2>

                <BookmarkList />
            </div>


        </>
    )
}