import React from "react";
import { useEffectOnce } from "react-use";
import { useSnackbar } from 'notistack';

import { listMedia } from "../requests/Requests";
import { useNavigate } from "react-router-dom";
import MediaElement from "../components/MediaElement";
import UploadElement from "../components/UploadElement";
import { handleError, handleSuccess } from "../util/SnackbarHandler";
import { client } from "../pocketbase/PocketBaseHandler";
import FilterSection from "../components/FilterSection";

const MediaPage = (_props: any) => {
    const snackbar = useSnackbar()
    const navigate = useNavigate()

    const [mediaList, setMediaList] = React.useState([]);
    const [selectedDate, setSelectedDate] = React.useState<Date>();

    const filteredMediaList = () => {
        let filteredList = mediaList

        // Month filter
        if (selectedDate != null) {
            filteredList = filteredList.filter((item: any) => {
                const exifDate = item.exif_date
                if (exifDate == null) return false
    
                const date = new Date(exifDate)
    
                return date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear();
            })
        }

        // Sort by creation date
        filteredList = filteredList.sort((a: any, b: any) => {
            const aDate = new Date(a.created)
            const bDate = new Date(b.created)

            return bDate.getTime() - aDate.getTime()
        })

        return filteredList
    }

    const fetchMedia = async () => {
        try {
            const response = await listMedia();
            setMediaList(response);
        } catch (error: any) {
            if (error?.response?.data.code === 401) {
                client.authStore.clear()
                navigate("/login")
            } else {
                handleError(snackbar, error);
            }            
        }
    };

    const handleMonthChange = (month: Date) => {
        setSelectedDate(month)
        handleSuccess(snackbar, "Filtered by month " + month.toLocaleString('default', { month: 'long' }) + " " + month.getFullYear())
    }

    const handleMonthReset = () => {
        setSelectedDate(undefined)
        handleSuccess(snackbar, "Reset month filter")
    }

    useEffectOnce(() => {
        fetchMedia();
    });

    return (
        <div>
            <div className="h-full">
                <FilterSection
                    mediaList={mediaList}
                    onMonthChange={handleMonthChange}
                    onMonthReset={handleMonthReset}
                />

                {/* Upload element */}
                <UploadElement onUpload={() => {
                    fetchMedia();
                }} />

                {/* Images Grid */}
                <div className="grid grid-cols-5 gap-2 px-2">
                    {
                        filteredMediaList().map((media: any) => 
                            <MediaElement key={media.id} media={media} onMediaDelete={fetchMedia} />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default MediaPage;
