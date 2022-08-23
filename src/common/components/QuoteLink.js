import { useState, useContext, useRef } from 'react';
import dynamic from 'next/dynamic';
// Dynamicly load component on client side with no SSR
const Hovercard = dynamic(() => import('./Hovercard'), {
    ssr: false,
})
import { ThreadContext } from '../context/ThreadContext';
import Post from './Post';

export default function QuoteLink({ content, postId }) {
    const thread = useContext(ThreadContext);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [preview, setPreview] = useState(null);
    const quotelinkRef = useRef();

    const handleMouseOver = () => {
        setIsMouseOver(true);
        console.log('mouse over link No.', postId);
        setPreview(findPost(postId, thread, quotelinkRef));
    };

    const handleMouseOut = () => {
        setIsMouseOver(false);
        setPreview(null);
        console.log('mouse out of link No', postId);
    };

    return (
        <>
            <a className="quotelink" href={`#p${postId}`} ref={quotelinkRef}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                {content}
            </a>

            {/* Display preview of post when mousing over link */}
            {
                isMouseOver &&
                <Hovercard>
                    <Post
                        {...preview}
                    />
                </Hovercard>
            }
        </>
    )
}

/**
 * Helper function to find and return new post object with matching post id
 * with additional attributes for styling
 */
function findPost(postId, thread, quotelinkRef) {
    const post = thread.find(post => post.post_id == postId);
    if (post === undefined) return null;
    // Make a copy of the post to avoid mutation
    const { thumbnail_h: thumbnailHeight, thumbnail_w: thumbnailWidth, ...preview } = post;
    // // // Reassign thumnail height and weight if not undefined
    thumbnailHeight && (preview.thumbnailHeight = thumbnailHeight);
    thumbnailWidth && (preview.thumbnailWidth = thumbnailWidth);

    // Set preview flag true
    preview.preview = true;
    // Add inline style
    const rec = quotelinkRef.current.getBoundingClientRect();
    // console.log(rec);
    // window.scrollY for position absolute
    preview.style = { top: rec.top + window.scrollY, left: rec.left + 50 };
    console.log(preview);
    return preview;
}