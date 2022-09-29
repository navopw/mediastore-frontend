
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
            const date = new Date(exifDate)

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

export default Sidebar