import * as React from "react"

interface DialogProps {
    children: React.ReactNode
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function Dialog({ children, open, onOpenChange }: DialogProps) {
    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                {children}
            </div>
        </div>
    )
}

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
    return (
        <div
            className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
            {...props}
        />
    )
}

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export function DialogTitle({ className, ...props }: DialogTitleProps) {
    return (
        <h2
            className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
            {...props}
        />
    )
}

interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> { }

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
    return (
        <p
            className={`text-sm text-gray-500 ${className}`}
            {...props}
        />
    )
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> { }

export function DialogContent({ className, ...props }: DialogContentProps) {
    return (
        <div
            className={`space-y-4 ${className}`}
            {...props}
        />
    )
}

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> { }

export function DialogFooter({ className, ...props }: DialogFooterProps) {
    return (
        <div
            className={`flex justify-end space-x-2 ${className}`}
            {...props}
        />
    )
} 