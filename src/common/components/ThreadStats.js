import useThread from '../hooks/useThread';

export default function ThreadStats() {
    const { data, isLoading } = useThread();

    return (
        <div className='thread-stats'>
            <span className="thread-reply-count" data-tip='Replies'>{data?.[0].replies ?? 0}</span>
            {' / '}
            <span className="thread-image-count" data-tip='Images'>{data?.[0].images ?? 0}</span>
            {' / '}
            <span className="thread-poster-count" data-tip='Posters'>{data?.[0].posters ?? 0}</span>
        </div>
    )
}