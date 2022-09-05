import { useState, useContext, useRef, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import styles from './Post.module.css'
import QuoteLink from './QuoteLink';

export default function Post(props) {
    const router = useRouter();
    // const quoteText = useRef(null);

    // Update to local time format from server Unix time stamp
    // TODO: Use UTC time on initial render instead of Unix time
    // to fix visible layout change caused by setState on mount
    const [localTime, setLocalTime] = useState(props.created_at);
    useEffect(() => {
        setLocalTime(createdAt(props.created_at));
    }, [])

    const quoteText = { current: null };

    const { board } = router.query;
    // const board = 'a';
    // const threadId = props.thread_id || props.post_id;

    function handleReplyPost(e) {
        //Check mouseup button event is left button
        if (e.button != 0) return;

        const { comment } = props.form.current;
        comment.focus();
        comment.value += `>>${props.post_id}\r\n`;

        if (quoteText.current !== null) {
            //Add `>` in front of each new line
            const multiline = quoteText.current.trim().split(/\r?\n/);
            comment.value += `>${multiline.join(`\n>`)}\n`;
            quoteText.current = null;
        }
    }

    function handleSelectedText(e) {
        //Check mouseup button event is left button
        if (e.button != 0) return;

        if (document.getSelection().toString()) {
            const selection = document.getSelection().toString();
            quoteText.current = selection;
        }
    }

    return (
        <div className={props.preview ? "post preview" : "post"}
            id={props.preview ? "quote-preview" : `p${props.post_id}`}
            style={props.style ? props.style : null}>
            <div className={"post-info"}>
                <span className="post-subject">{props.subject}&nbsp;</span>
                <span className="post-author">{props.name ?? `Anonymous`}&nbsp;</span>
                {/* SSR Server and Client datetime mismatch on hygradation*/}
                {/* <span className="post-date">{createdAt(props.created_at)}&nbsp;</span> */}

                {/* <span className="post-date">{props.created_at}&nbsp;</span> */}
                <span className="post-date">{localTime}&nbsp;</span>

                <span className="post-id">
                    <Link href={`#p${props.post_id}`} scroll={false}>
                        <a title="Link to this post">No.</a>
                    </Link>
                    <a title="Reply to this post"
                        onMouseDown={handleSelectedText}
                        onMouseUp={handleReplyPost}>
                        {props.post_id}&nbsp;
                    </a>
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

            <div className={"comment"}>
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
    const backlink = replies.map((link, i) =>
        <QuoteLink key={i} content={`>>${link}`} postId={link} />
    )

    return (
        <div className='backlink'>
            {backlink}
        </div>
    )
}


function Comment(props) {
    //Ref: https://github.com/facebook/react/issues/3386#issuecomment-518163501
    //Add brackets ( ) around regex to retain the separator
    const regex = /([>]{2}[0-9]+)/g;
    const parts = props.comment.split(regex);

    return (
        <>
            <blockquote className="post-comment">
                {
                    parts.map((part, i) => (part.match(regex)
                        ? <QuoteLink key={i} content={part} postId={part.slice(2)} />
                        : part))
                }
            </blockquote>
        </>
    );
}

function Thumbnail(props) {
    const [thumbnail, setThumbnail] = useState(true);

    function handleImageClick(e) {
        e.preventDefault();
        setThumbnail(thumbnail => !thumbnail);
    }

    return (
        <div className={"thumbnail-container"}>
            <div className={"image-info"}>
                <span>
                    File:
                    <Link href={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/img/${props.tim}${props.ext}`}>
                        <a target="_blank"> {props.filename} </a>
                    </Link>
                    ({props.width}x{props.height})
                </span>
            </div>

            <Link href={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/img/${props.tim}${props.ext}`}>
                <a className={"thumbnail"} onClick={handleImageClick}>
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
