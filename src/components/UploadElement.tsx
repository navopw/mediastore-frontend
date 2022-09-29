import { useSnackbar } from "notistack";
import { uploadMedia } from "../requests/Requests";
import { handleError, handleSuccess } from "../util/SnackbarHandler";

interface UploadElementProps {
    onUpload: () => void;
}

const UploadElement = (props: UploadElementProps) => {
    const snackbar = useSnackbar();

    const handleFileChange = async (event: any) => {
        const files = event.target.files

        if (files == null) {
            handleError(snackbar, "No files selected");
            return
        }

        // Loop through all files and upload them
        for (let i = 0; i < files.length; i++) {
            const file: File | null = files.item(i);
            try {
                const response = await uploadMedia(file!!);

                // Trigger event
                props.onUpload();

                // Show success message
                handleSuccess(snackbar, `Uploaded ${response.name}`);
            } catch (error: any) {
                handleError(snackbar, error);
            }
        }
    }

    // Input file element
    return (
        <div className="m-2 mb-5">
            <div className="mt-1 sm:col-span-2 sm:mt-0">
                <div className="flex max-w justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="text-sm text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none hover:text-indigo-800"
                            >
                                <span>Upload files</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                            </label>
                        </div>
                        <p className="text-xs text-gray-500">All types of images and videos, unlimited storage</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UploadElement