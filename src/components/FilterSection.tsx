import React from "react";
import Dropdown, { DropdownOption } from "./Dropdown";

interface FilterSectionProps {
    mediaList: any;
    onMonthChange: (month: Date) => void;
    onMonthReset: () => void;
}

const RESET_FILTER = "Reset filter";

const FilterSection = (props: FilterSectionProps) => {
    const getFoundMonths = () => {
        const list = props.mediaList
        const result: any = [];

        list.forEach((item: any) => {
            const exifDate = item.exif_date
            if (exifDate == null || exifDate == "") return

            // Date object
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

    const monthsAsOptions = () => {
        const options: DropdownOption[] = []
        const months = getFoundMonths()

        if (months.length == 0) {
            options.push({
                value: null,
                name: "No months found"
            })
        }

        months.forEach((item: Date) => {
            options.push({
                value: item,
                name: item.toLocaleString('default', { month: 'long' }) + " " + item.getFullYear()
            })
        })

        // Add reset option
        options.push({
            value: null,
            name: RESET_FILTER
        })

        return options
    }

    return (
        <div className="mt-5 ml-2 mb-5">
            <Dropdown text="Monat" options={monthsAsOptions()} handleOptionClick={(option: any) => {
                if (option.name == RESET_FILTER) {
                    console.log("Reset filter")
                    props.onMonthReset()
                }
                
                if (option.value == null) return

                props.onMonthChange(option.value)
            }}/>
        </div>
    )
}

export default FilterSection