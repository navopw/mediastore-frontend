import React from "react";
import { useSnackbar } from "notistack";
import { uploadMedia } from "../requests/Requests";
import { handleError, handleSuccess } from "../util/SnackbarHandler";

interface UploadElementProps {
    onUpload: () => void;
}

const UploadElement = (props: UploadElementProps) => {
    const snackbar = useSnackbar();

    const [uploading, setUploading] = React.useState(false); // Unused because of batch processing
    const [uploadProgress, setUploadProgress] = React.useState<number>(0);

    const deepCopyFileWithType = (file: File, type: string) => {
        const newFile = new File([file], file.name, { type });
        return newFile;
    };

    const handleFileChange = async (event: any) => {
        const files: FileList = event.target.files

        if (files == null) {
            handleError(snackbar, "No files selected");
            return
        }


        for (const element of files) {
            let file = element;
        
            if (file.name.endsWith(".heic")) {
                file = deepCopyFileWithType(file, "image/heic");
            }

            try {
                await uploadMedia(file);
                handleSuccess(snackbar, "Uploaded " + file?.name);
                props.onUpload();
            } catch (error: any) {
                handleError(snackbar, error.message);
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
                            <span className="font-medium text-gray ">
                            &nbsp;or&nbsp;
                            </span>
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none hover:text-indigo-800"
                            >
                                <span>folder</span>
                                {/* @ts-expect-error */}
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" webkitdirectory="" multiple onChange={handleFileChange} />
                            </label>
                        </div>
                        <p className="text-xs text-gray-500">All types of images and videos, unlimited storage</p>
                    </div>
                </div>
            </div>
            {
                (uploading) && (
                    <div className="mt-2">
                        <div className="w-full bg-gray-400 rounded-full">
                            <div className="bg-gray-800 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full" style={{ width: `${uploadProgress}%` }}>
                                {
                                    uploadProgress == 100 ? (
                                        <>Processing media...</>
                                    ) : (
                                        <>
                                            {uploadProgress}%
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default UploadElement