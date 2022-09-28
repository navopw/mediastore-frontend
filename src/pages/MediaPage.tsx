import React from "react";
import { useEffectOnce } from "react-use";
import { useSnackbar } from 'notistack';

import { listMedia, getMedia, getMediaPreview, uploadMedia } from "../requests/Requests";
import { useNavigate } from "react-router-dom";

/*
    props.mediaList
    props.onMonthClick
*/
const Sidebar = (props: any) => {
    const getFoundMonths = () => {
        const list = props.mediaList
        const result: any = [];

        list.forEach((item: any) => {
            const exifDate = item.exif_date
            if (exifDate == 0) return

            // Unix timestamp
            const date = new Date(exifDate * 1000)

            // Unique
            const alreadyExists = result.find((item: Date) =>
                item.getFullYear() === date.getFullYear() && item.getMonth() === date.getMonth()
            )

            if (!alreadyExists) {
                result.push(date)
            }
        })

        return result;
    }

    return (
        <aside className="w-full h-full" aria-label="Sidebar">
            <div className="h-full overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 text-base font-normal text-gray-900 rounded-lg dark:text-white">
                    {
                        getFoundMonths().map((item: Date, index: number) => {
                            return (
                                <li key={index} className="cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <a onClick={() => props.onMonthClick(item)} className="block w-full h-full">
                                        {item.toLocaleString('default', { month: 'long' })} {item.getFullYear()}
                                    </a>
                                </li>
                            )
                        })
                    }

                    {/* Reset */}
                    <li className="cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <a onClick={() => props.onMonthClick(null)} className="block w-full h-full">
                            Reset filter
                        </a>
                    </li>
                </ul>
            </div>
        </aside>

    )
}

const UploadElement = (props: any) => {
    const snackbar = useSnackbar();
    const [files, setFiles] = React.useState<FileList>();

    const handleFileChange = (e: any) => {
        setFiles(e.target.files);
    }

    const handleUploadClick = async () => {
        if (files == null) {
            snackbar.enqueueSnackbar("No file selected", { variant: "error" });
            return
        }

        for (let i = 0; i < files.length; i++) {
            const file: File | null = files.item(i);
            try {
                const response = await uploadMedia(file!!);

                props.onUpload();

                snackbar.enqueueSnackbar(`Uploaded ${response.name}`, { variant: "info" });
            } catch (error: any) {
                alert(error.message);
            }
        }
    }

    // Input file element
    return (
        <div className="m-5">
            <input multiple type="file" id="file" onChange={handleFileChange} />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleUploadClick}>Upload</button>
        </div>
    )
}

// props.id
const MediaElement = (props: any) => {
    const [mediaBase64, setMediaBase64] = React.useState<any>(null)

    useEffectOnce(() => {
        const fetchMedia = async () => {
            try {
                const _media = await getMediaPreview(props.media.id)
                setMediaBase64(_media)
            } catch (error) {
                console.log(error)
            }
        }

        fetchMedia()
    })

    const handleMediaDownload = async () => {
        try {
            const blob = await getMedia(props.media.id)

            const url = window.URL.createObjectURL(blob)

            const anchor = document.createElement('a')
            anchor.href = url
            anchor.target = '_blank'
            anchor.click()
        } catch (error) {
            console.log(error)
        }

    }

    if (mediaBase64 == null) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg my-2">
            <img src={"data:image/jpeg;base64," + mediaBase64} alt={mediaBase64} />
            <div className="text-center py-2">
                <div className="font-bold text-sm">
                    <a onClick={handleMediaDownload}>{props.media.name}</a>
                </div>
            </div>
        </div>
    )
}

const MediaPage = (_props: any) => {
    const snackbar = useSnackbar()
    const navigate = useNavigate()
    const [mediaList, setMediaList] = React.useState([]);
    const [selectedDate, setSelectedDate] = React.useState<Date>();

    const handleDateClick = (date: any) => {
        setSelectedDate(date);
    }

    const filteredMediaList = () => {
        if (selectedDate == null) return mediaList;

        return mediaList.filter((item: any) => {
            const exifDate = item.exif_date
            if (exifDate == 0) return false

            // Unix timestamp
            const date = new Date(exifDate * 1000)

            return date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();
        })
    }

    const fetchMedia = async () => {
        try {
            const response = await listMedia();
            setMediaList(response);
        } catch (error: any) {
            if (error.response.status === 401) {
                navigate("/login")
                return
            }

            snackbar.enqueueSnackbar(error.response?.data?.message, { variant: "error" });
        }
    };

    useEffectOnce(() => {
        fetchMedia();
    });

    return (
        <div className="h-screen">
            <div className="grid grid-cols-4 h-full">
                <div className="h-screen">
                    {/* List with the last 12 months */}
                    <Sidebar mediaList={mediaList} onMonthClick={handleDateClick} />
                </div>
                <div className="col-span-3">
                    {/* Upload element */}
                    <UploadElement onUpload={() => {
                        fetchMedia();
                    }} />

                    {/* Images Grid */}
                    <div className="grid grid-cols-5 gap-2 px-2">
                        {
                            filteredMediaList().map((media: any) => {
                                return (
                                    <MediaElement key={media.id} media={media} />
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MediaPage;
