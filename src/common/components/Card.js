import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';

import { useCatalog } from '../context/CatalogContext';

export default function Card(props) {
    const { imageSize, showOpComment } = useCatalog();

    const router = useRouter();
    const { board } = router.query;

    const { height, width } = getDimensions(props.thumbnailHeight, props.thumbnailWidth);

    return (
        <div className="post-card">

            <div className="post-image">
                <Link href={`/${board}/thread/${props.post_id}`}>
                    {
                        imageSize == 'small' ?
                            <a>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/img/${props.tim}s.jpg`}
                                    width={width}
                                    height={height}
                                    alt={props.filename}
                                />
                            </a>

                            : <a>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/img/${props.tim}s.jpg`}
                                    width={props.thumbnailWidth ?? 250}
                                    height={props.thumbnailHeight ?? 250}
                                    alt={props.filename}
                                />
                            </a>
                    }
                </Link>
            </div>

            <div className="post-details">
                <div className="post-meta" title="(R)eplies / (I)mage Replies">
                    {`R: `}
                    <span className="reply-count">{props.replies}</span>
                    {` / I: `}
                    <span className="image-count">{props.images}</span>
                </div>

                {
                    showOpComment && <>
                        <div className="post-subject">{props.subject}</div>
                        <div className="post-preview">{props.comment}</div>
                    </>
                }
            </div>

        </div>
    )
}

function getDimensions(height, width) {
    const maxLength = 150;

    if (height == null || width == null) {
        return { height: maxLength, width: maxLength };
    }

    if (height > width) {
        return { height: 150, width: width * (maxLength / height) };
    }

    return { height: height * (maxLength / width), width: maxLength };
}