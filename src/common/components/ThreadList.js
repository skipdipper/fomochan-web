import Post from './Post'

export default function ThreadList({ data }) {
    const threads = data.map((thread) =>
        <div className='thread' key={thread.post_id}>
            <Post
                subject={thread.subject}
                name={thread.name}
                created_at={thread.created_at}
                post_id={thread.post_id}
                comment={thread.comment}
                filesize={thread.filesize}
                filename={thread.filename}
                ext={thread.ext}
                width={thread.width}
                height={thread.height}
                thumbnailWidth={thread.thumbnail_w}
                thumbnailHeight={thread.thumbnail_h}
                thread_id={thread.thread_id}
                replies={thread.replies}
                images={thread.images}
                tim={thread.tim}
                op={true}
            />
        </div>
    )

    return (
        <div className='board'>
            {threads}
        </div>
    )
}