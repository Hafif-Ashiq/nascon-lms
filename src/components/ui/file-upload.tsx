import * as React from "react"

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    currentFile?: string;
    className?: string;
    type?: 'image' | 'video';
}

export function FileUpload({ onFileSelect, currentFile, className = "", type = 'image' }: FileUploadProps) {
    const [preview, setPreview] = React.useState<string | null>(currentFile || null);
    const [error, setError] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setError(null);

        if (file) {
            // Check file type based on upload type
            const validTypes = type === 'image'
                ? ['image/jpeg', 'image/png', 'image/jpg']
                : ['video/mp4', 'video/webm', 'video/ogg'];

            if (!validTypes.includes(file.type)) {
                setError(type === 'image'
                    ? 'Please upload a valid image file (JPEG, PNG, or JPG)'
                    : 'Please upload a valid video file (MP4, WebM, or OGG)'
                );
                return;
            }

            // Check file size (max 5MB for images, 100MB for videos)
            const maxSize = type === 'image' ? 5 * 1024 * 1024 : 100 * 1024 * 1024;
            if (file.size > maxSize) {
                setError(type === 'image'
                    ? 'File size should be less than 5MB'
                    : 'File size should be less than 100MB'
                );
                return;
            }

            // Create preview
            if (type === 'image') {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else if (type === 'video') {
                const videoUrl = URL.createObjectURL(file);
                setPreview(videoUrl);
            }

            onFileSelect(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={type === 'image' ? ".jpg,.jpeg,.png" : ".mp4,.webm,.ogg"}
                className="hidden"
            />
            <div
                onClick={handleClick}
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
                {preview ? (
                    <div className="relative">
                        {type === 'image' ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        ) : (
                            <video
                                src={preview}
                                className="w-full h-48 object-cover rounded-lg"
                                controls
                            />
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white">Click to change {type}</span>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="text-sm text-gray-600">
                            <span className="font-medium text-blue-600">Upload a {type}</span> or drag and drop
                        </div>
                        <p className="text-xs text-gray-500">
                            {type === 'image'
                                ? 'PNG, JPG, JPEG up to 5MB'
                                : 'MP4, WebM, OGG up to 100MB'
                            }
                        </p>
                    </div>
                )}
            </div>
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}