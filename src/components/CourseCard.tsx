interface CourseCardProps {
    title: string;
    description: string;
    studentCount: number;
    thumbnail?: string;
    onEdit: () => void;
    onDelete: () => void;
    viewMode: 'list' | 'grid';
    onClick: () => void;
    isTeacher?: boolean;
}

export function CourseCard({
    title,
    description,
    studentCount,
    thumbnail,
    onEdit,
    onDelete,
    viewMode,
    onClick,
    isTeacher = true
}: CourseCardProps) {
    return (
        <div onClick={onClick} className={`rounded-lg border cursor-pointer  shadow-sm justify-start ${viewMode === 'list' ? 'w-full flex' : 'w-full sm:w-[300px]'}`}>
            {thumbnail && (
                <div className={`relative h-40 ${viewMode == "list" ? "w-[60px]" : "w-full"}`}>
                    <img
                        src={thumbnail}
                        alt={title}
                        className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
                    />
                </div>
            )}
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>
                    {isTeacher && <div className="relative">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                const menu = document.getElementById(`menu-${title}`);
                                if (menu) menu.classList.toggle('hidden');
                            }}
                            className="p-1 hover:bg-[#f3f4f6] rounded-full"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                            </svg>
                        </button>
                        <div
                            id={`menu-${title}`}
                            className="hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                        >
                            <div className="py-1">
                                <button
                                    onClick={onEdit}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={onDelete}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>}
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
            </div>
            {isTeacher && <div className="p-6 pt-0">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>{studentCount} students</span>
                </div>
            </div>}
        </div>
    );
} 