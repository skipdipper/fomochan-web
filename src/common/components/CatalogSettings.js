import { useCatalog, useCatalogUpdate } from '../../common/context/CatalogContext';

export default function CatalogSettings() {
    const { sortBy, imageSize, showOpComment } = useCatalog();
    const { setSortBy, setImageSize, setShowOpComment } = useCatalogUpdate();

    return (
        <div id='catalog-settings'>
            <label htmlFor="sort-by-select">Sort By:</label>
            <select
                name="sort-by-select"
                id="sort-by-select"
                defaultValue={sortBy}
                onChange={() => setSortBy(event.target.value)}
            >
                <option value="bump" >Bump order</option>
                <option value="reply">Last reply</option>
                <option value="date" >Creation date</option>
                <option value="count">Reply Count</option>
            </select>

            <label htmlFor="image-size-select">Image Size:</label>
            <select
                name="image-size-select"
                id="image-size-select"
                defaultValue={imageSize}
                onChange={() => setImageSize(event.target.value)}
            >
                <option value="small" >Small</option>
                <option value="large">Large</option>
            </select>

            <label htmlFor="op-comment-select">Show OP Comment:</label>
            <select
                name="op-comment-select"
                id="op-comment-select"
                defaultValue={showOpComment}
                onChange={() => setShowOpComment(showOpComment => !showOpComment)}
            >
                <option value={true} >On</option>
                <option value={false}>Off</option>
            </select>
        </div>
    )
}