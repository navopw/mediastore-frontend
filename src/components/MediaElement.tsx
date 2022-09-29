import { useSnackbar } from "notistack"
import React from "react"
import useEffectOnce from "react-use/lib/useEffectOnce"
import { getMedia, getMediaPreview } from "../requests/Requests"
import { handleError } from "../util/SnackbarHandler"

// props.id
const MediaElement = (props: any) => {
    const snackbar = useSnackbar()
    const [mediaBase64, setMediaBase64] = React.useState<any>(null)

    const fetchMedia = async () => {
        try {
            const _media = await getMediaPreview(props.media.id)
            setMediaBase64(_media)
        } catch (error) {
            console.log(error)
        }
    }

    useEffectOnce(() => {
        fetchMedia()
    })

    const handleMediaDownload = async () => {
        try {
            const blob = await getMedia(props.media.id)

            const url = window.URL.createObjectURL(blob)

            const anchor = document.createElement("a")
            anchor.href = url
            anchor.target = "_blank"
            anchor.click()
        } catch (error: any) {
            handleError(snackbar, error)
        }
    }

    if (mediaBase64 == null) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="max-w max-h rounded overflow-hidden shadow-lg my-2">
            <img src={"data:image/jpeg;base64," + mediaBase64} alt={mediaBase64} />
            <div className="text-center py-2">
                <div className="font-bold text-sm">
                    <a onClick={handleMediaDownload}>{props.media.name}</a>
                </div>
            </div>
        </div>
    )
}

export default MediaElement