import { Button, CircularProgress, Paper, styled } from "@mui/material";
import { addMusicFile } from "../../database";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showFailNotification, showSuccessNotification } from "../../redux/state/notificationReducer";

const UploadPagePaper = styled(Paper)(() => ({
    borderRadius: 0,
}));

function Upload() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleFileUpload = async () => {
        if(!file){
            dispatch(showFailNotification("No file selected"))
            return;
        }
        setLoading(true);
        try {
            await addMusicFile(file);
            dispatch(showSuccessNotification("File uploaded!"));
            setFile(null);
        } catch (e) {
            dispatch(showFailNotification("Failed to upload file"))
        }
        setLoading(false);
    };

    return (
        <UploadPagePaper elevation={2} className="flex-row justify-center screen-height container-width">
            <div className="flex-column responsive-width gap-1">
                <h1>
                    Upload Music
                </h1>
                <FileUploader
                    types={["MP3"]}
                    handleChange={(f) => setFile(f)}
                    disabled={loading}
                    children={
                        <div
                            className="flex-row justify-center align-center container-width dashed-border drag-file-zone"
                        >
                            {
                                file ? file?.name : "Drag & Drop new file"
                            }
                        </div>
                    }
                />
                <Button
                    disabled={loading}
                    variant="contained"
                    onClick={handleFileUpload}
                >
                    Confirm
                    {loading && <CircularProgress size={20} />}
                </Button>
            </div>
        </UploadPagePaper>
    )
}

export default Upload