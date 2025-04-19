'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import AddVideoModal from '@/components/AddVideoPopup';

import { useRouter } from 'next/navigation';
interface Video {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    duration: string;
}

interface Student {
    id: number;
    name: string;
}

interface Course {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    videos: Video[];
    students: Student[];
}

// Mock data - replace with actual API calls
const mockCourse: Course = {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn the basics of programming with Python. This course covers fundamental concepts, data structures, and algorithms.",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    videos: [
        {
            id: 1,
            title: "Getting Started with Python",
            description: "Learn how to set up your Python environment and write your first program.",
            thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            duration: "15:30",
        },
        {
            id: 2,
            title: "Variables and Data Types",
            description: "Understand different data types and how to use variables in Python.",
            thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            duration: "20:15",
        },
    ],
    students: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Bob Johnson" },
    ],
};

export default function CoursePage() {
    const router = useRouter()
    const params = useParams();
    const [activeTab, setActiveTab] = useState<'videos' | 'students'>('videos');
    const course = mockCourse; // Replace with actual course data fetching
    const [addVideoModalOpen, setAddVideoModalOpen] = useState(false);

    const handleDeleteVideo = (videoId: number) => {
        if (!confirm("Are you sure to delete this video")) return
        // TODO: Implement actual delete functionality
        // This should make an API call to delete the video
        console.log('Deleting video:', videoId);
    };

    return (
        <div className="container mx-auto py-8">
            {/* Course Header */}
            <div className="relative h-64 w-full mb-8">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="absolute inset-0 h-full w-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                        <p className="text-lg max-w-2xl mx-auto">{course.description}</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`${activeTab === 'videos'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Videos
                    </button>
                    <button
                        onClick={() => setActiveTab('students')}
                        className={`${activeTab === 'students'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Students
                    </button>
                </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-8">
                {activeTab === 'videos' ? (
                    <div className='flex flex-col gap-[20px] '>
                        <div className='flex justify-end'>
                            <Button className='cursor-pointer' onClick={() => { setAddVideoModalOpen(true) }}>Add New Video</Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {course.videos.map((video) => (
                                <div key={video.id} className="rounded-lg border shadow-sm overflow-hidden group relative">
                                    <div className="relative h-48">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                                            {video.duration}
                                        </div>
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDeleteVideo(video.id)}
                                            className="absolute top-2 right-2 p-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                                            title="Delete video"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M3 6h18"></path>
                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                                        <p className="text-sm text-gray-500">{video.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {course.students.map((student) => (
                                <li key={student.id} className="px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-500 text-sm font-medium">
                                                    {student.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {student.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    ID: {student.id}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <AddVideoModal isOpen={addVideoModalOpen} onClose={() => setAddVideoModalOpen(false)} onSubmit={() => { }} />
        </div>
    );
} 