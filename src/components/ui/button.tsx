import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
}

const buttonVariants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-100",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "hover:bg-gray-100",
    link: "text-blue-600 underline hover:text-blue-700",
}

const buttonSizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
}

export function Button({
    className = "",
    variant = "default",
    size = "default",
    ...props
}: ButtonProps) {
    return (
        <button
            className={`
                inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
                transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                disabled:pointer-events-none disabled:opacity-50
                ${buttonVariants[variant]}
                ${buttonSizes[size]}
                ${className}
            `}
            {...props}
        />
    )
} 