import { useState, useContext } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';

import { ThreadContext } from '../context/ThreadContext';

import styles from './Post.module.css'

export default function Post(props) {
    const router = useRouter();
    // const { board } = router.query;
    const board = 'a';
    const threadId = props.thread_id || props.post_id;

    function handleReplyPost() {
        console.log(props.form.current.comment.value);
    }

    return (
        <div className={styles.post} id={`p${props.post_id}`}>
            <div className={styles.postInfo}>
                <span className="post-subject">{props.subject}&nbsp;</span>
                <span className="post-author">{props.name ?? `Anonymous`}&nbsp;</span>
                <span className="post-date">{createdAt(props.created_at)}&nbsp;</span>


                <span className="post-id">
                    <Link href={`#p${props.post_id}`} scroll={false}>
                        <a title="Link to this post">No.</a>
                    </Link>

                    <a title="Reply to this post"
                        onClick={() => {
                            console.log('clicked on repply to this post');
                            const { comment } = props.form.current;
                            console.log('current comment', comment.value);
                            comment.focus();
                            comment.value += `>>${props.post_id}\r\n`;

                        }}

                    >{props.post_id}&nbsp;</a>
                </span>
                <span>
                    <Link href="#">
                        <a>▶</a>
                    </Link>
                </span>

                {Boolean(props.reply_to) &&
                    <BackLink replies={props.reply_to} />
                }

            </div>



            {props.filesize &&
                <Thumbnail {...props} />
            }

            <div className={styles.comment}>
                {/* <p>{props.comment}</p> */}
                <Comment comment={props.comment} />
            </div>

            {props.thread_id == 0 && props.op &&
                <div>
                    {props.replies} replies {props.images} images
                    <Link href={`/${board}/thread/${props.post_id}`}>
                        <a> View thread </a>
                    </Link>
                </div>
            }
        </div>
    )
}

function createdAt(createdAt) {
    return new Date(createdAt * 1000).toLocaleString("en-US");
}

function BackLink({ replies }) {
    const backlink = replies.map((link) =>
        <span className='quotelink' key={link}>
            <Link href={`#p${link}`} scroll={false}>
                <a>{`>>${link}`}</a>
            </Link>
        </span>
    )

    return (
        <div className='backlink'>
            {backlink}
        </div>
    )
}

// function Comment({ comment }) {
//     const regex = /[>]{2}[0-9]+/g;
//     // const data = comment.replace(regex, `<a href='#'>$&</p>`);
//     const data = comment.replace(regex, quotelink);


//     function quotelink(match, offset, string) {
//         // return `<a class="quotelink" href=#p${match.slice(2)}>${match}</a><br>`;
//         return `<a class="quotelink" href=#p${match.slice(2)}>${match}</a>`;
//     }

//     return (
//         <>
//             <blockquote className="post-comment" dangerouslySetInnerHTML={{ __html: data }} />
//         </>
//     );
// }

function Comment(props) {
    //Ref: https://github.com/facebook/react/issues/3386#issuecomment-518163501
    const thread = useContext(ThreadContext);
    const [mouseOverPostId, setMouseOverPostId] = useState(null);
    const [isMouseOver, setIsMouseOver] = useState(false);

    const handleMouseOver = (postId) => {
        setIsMouseOver(true);
        setMouseOverPostId(postId);
        console.log('mouse over link No.', postId);
    };

    const handleMouseOut = () => {
        setIsMouseOver(false);
        setMouseOverPostId(null);
        console.log('mouse out of link');
    };

    //Add brackets ( ) around regex to retain the separator
    const regex = /([>]{2}[0-9]+)/g;
    const parts = props.comment.split(regex);

    return (
        <>
            <blockquote className="post-comment">
                {
                    parts.map((part, i) => (part.match(regex)
                        ? <a key={i} className="quotelink" href={`#p${part.slice(2)}`}
                            onMouseOver={() => handleMouseOver(part.slice(2))}
                            onMouseOut={handleMouseOut}
                        >{part}</a>
                        : part))
                }
            </blockquote>

            {
                isMouseOver && Post(findPost(mouseOverPostId, thread))
            }
        </>
    );
}

function findPost(postId, thread) {
    for (let post of thread) {
        if (post.post_id == postId) {
            if (post?.thumbnail_h !== undefined) post.thumbnailHeight = post.thumbnail_h;
            if (post?.thumbnail_w !== undefined) post.thumbnailWidth = post.thumbnail_w;

            console.log(post);
            return post;
        }
    }
    return null;
}

function Thumbnail(props) {
    const [thumbnail, setThumbnail] = useState(true);

    function handleImageClick(e) {
        e.preventDefault();
        setThumbnail(thumbnail => !thumbnail);
    }

    return (
        <div className={styles.image}>
            <div className={styles.imageInfo}>
                <span>
                    File:
                    <Link href={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/img/${props.tim}${props.ext}`}>
                        <a target="_blank"> {props.filename} </a>
                    </Link>
                    ({props.width}x{props.height})
                </span>
            </div>

            <Link href={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/img/${props.tim}${props.ext}`}>
                <a className={styles.thumbnail} onClick={handleImageClick}>
                    {
                        thumbnail
                            ? <Image
                                src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/img/${props.tim}s.jpg`}
                                width={props.thumbnailWidth}
                                height={props.thumbnailHeight}
                                alt={props.filename}
                            />
                            : <Image
                                src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/img/${props.tim}${props.ext}`}
                                width={props.width}
                                height={props.height}
                                alt={props.filename}
                            />
                    }
                </a>
            </Link>
        </div>
    );
}