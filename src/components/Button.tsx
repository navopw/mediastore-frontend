const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(' ')
}

interface ButtonProps {
    fullWidth?: boolean
    onClick: () => void
    children: React.ReactNode
}

const Button = (props: ButtonProps) => {
    return (
        <button
            className={classNames(
                props.fullWidth ? 'w-full' : 'w-40',
                "flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none"
            )}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export default Button