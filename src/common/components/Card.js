import Image from 'next/image'
import Link from 'next/link'



export default function Card(props) {
    const board = 'a';

    return (
        <div className="post-card">

            <div className="post-image">
                <Link href={`/${board}/thread/${props.post_id}`}>
                    <a>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/img/${props.tim}s.jpg`}
                            width={125}
                            height={95}
                            alt={props.filename}
                        />
                    </a>
                </Link>
            </div>

            <div className="post-details">
                <div className="post-meta" title="(R)eplies / (I)mage Replies">
                    R: <span className="reply-count">{props.replies}</span> / I: <span className="image-count">{props.images}</span>
                </div>
                <div className="post-subject">{props.subject}</div>
                <div className="post-preview">{props.comment}</div>
            </div>

        </div>
    )
}