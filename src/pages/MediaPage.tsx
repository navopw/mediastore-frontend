import React from "react";
import { useEffectOnce } from "react-use";

import { listMedia, uploadMedia } from "../requests/Requests";

/*
    props.mediaList
    props.onMonthClick
*/
const Sidebar = (props: any) => {
    const getFoundMonths = () => {
        const list = props.mediaList
        const result: any = [];

        list.forEach((item: any) => {
            const exifDate = item.Exif?.DateTime
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

const MediaPage = (_props: any) => {
    const [mediaList, setMediaList] = React.useState([]);
    const [selectedDate, setSelectedDate] = React.useState<Date>();

    const buildPreviewUrl = (media: any) => {
        return `http://localhost:8080/media/preview?id=${media.ID}`;
    };

    const buildOriginalurl = (media: any) => {
        return `http://localhost:8080/media?id=${media.ID}`;
    };

    const handleDateClick = (date: any) => {
        setSelectedDate(date);
    }

    const filteredMediaList = () => {
        if (selectedDate == null) return mediaList;

        return mediaList.filter((item: any) => {
            const exifDate = item.Exif?.DateTime
            if (exifDate == 0) return false

            // Unix timestamp
            const date = new Date(exifDate * 1000)

            return date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();
        })
    }

    useEffectOnce(() => {
        const fetchMedia = async () => {
            const media = await listMedia();

            setMediaList(media);
        };

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
                    {/* Images Grid */}
                    <div className="grid grid-cols-5 gap-2 px-2">
                        {
                            filteredMediaList().map((media: any) => {
                                return (
                                    <div key={media.ID} className="max-w-xs rounded overflow-hidden shadow-lg my-2">
                                        <img key={media.ID} src={buildPreviewUrl(media)} alt={media.Name} />
                                        <div className="text-center py-2">
                                            <div className="font-bold text-sm">
                                                <a href={buildOriginalurl(media)}>{media.OriginalName}</a>
                                            </div>
                                        </div>
                                    </div>
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
