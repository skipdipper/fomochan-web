export default function Dropzone(props) {

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDragEnter(e) {
        e.preventDefault();
    }

    function handleDragLeave(e) {
        e.preventDefault();
    }


    function handleFiles(files) {
        // return a single file for now 
        const file = files[0];
        console.log(file);
        props.handleDropFile(file);


    }

    function handleFileDrop(e) {
        e.preventDefault();
        const files = e.dataTransfer.files;
        console.log(files);
        if (files.length) {
            // one or more files
            // handleFiles(files);


            handleFiles(files);
        }
    }

    function validateFile(file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    }

    return (
        <>
            <div className="container">
                <div className="drop-container"
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleFileDrop}
                >
                    <div className="drop-message">
                        <div className="upload-icon"></div>
                        Click here
                    </div>
                </div>
            </div>
        </>
    )

}