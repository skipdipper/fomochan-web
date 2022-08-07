import Image from 'next/image'
import Link from 'next/link'

import { useRouter } from 'next/router';


import styles from './Post.module.css'

function Post(props) {

    const router = useRouter();
    // const { board } = router.query;
    const board = 'a';

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
                    <Link href="#">
                        <a>No. </a>
                    </Link>
                    <a title="Reply to this post"
                        onClick={() => {
                            console.log('clicked on repply to this post');
                            const { comment } = props.form.current;
                            console.log('current comment', comment.value);
                            comment.value += `>>${props.post_id}`;

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
                <div className={styles.image}>
                    <div className={styles.imageInfo}>
                        <span>
                            File:
                            <Link href="#">
                                <a> {props.filename} </a>
                            </Link>
                            ({props.width}x{props.height})
                        </span>
                    </div>

                    <Link href="#">
                        <a className={styles.thumbnail}>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/img/${props.tim}s.jpg`}
                                width={125}
                                height={95}
                                alt={props.filename}
                            />
                        </a>
                    </Link>
                </div>
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

function Comment({ comment }) {
    const regex = /[>]{2}[0-9]+/g;
    // const data = comment.replace(regex, `<a href='#'>$&</p>`);
    const data = comment.replace(regex, quotelink);


    function quotelink(match, offset, string) {
        return `<a class="quotelink" href=#p${match.slice(2)}>${match}</a><br>`;
    }

    return (
        <>
            <blockquote className="post-comment" dangerouslySetInnerHTML={{ __html: data }} />
        </>
    );
}

export default Post;