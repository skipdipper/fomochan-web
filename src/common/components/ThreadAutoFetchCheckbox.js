export default function ThreadAutoFetchCheckbox({ handleAutoUpdate }) {
    return (
        <>
            <input type="checkbox" id="auto-update" name="auto-update"
                title="Fetch new replies automatically"
                onChange={handleAutoUpdate}
            />
            <label htmlFor='auto-update'>Auto</label>
        </>
    )
}