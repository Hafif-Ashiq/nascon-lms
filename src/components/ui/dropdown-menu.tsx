import * as React from "react"

interface DropdownMenuProps {
    children: React.ReactNode
    trigger: React.ReactNode
}

export function DropdownMenu({ children, trigger }: DropdownMenuProps) {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div className="relative">
            <div onClick={() => setIsOpen(!isOpen)}>
                {trigger}
            </div>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    {children}
                </div>
            )}
        </div>
    )
}

interface DropdownMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> { }

export function DropdownMenuTrigger({ className, ...props }: DropdownMenuTriggerProps) {
    return (
        <div
            className={`cursor-pointer ${className}`}
            {...props}
        />
    )
}

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> { }

export function DropdownMenuContent({ className, ...props }: DropdownMenuContentProps) {
    return (
        <div
            className={`py-1 ${className}`}
            {...props}
        />
    )
}

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLButtonElement> { }

export function DropdownMenuItem({ className, ...props }: DropdownMenuItemProps) {
    return (
        <button
            className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${className}`}
            {...props}
        />
    )
} 