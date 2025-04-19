'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import AddVideoModal from '@/components/AddVideoPopup';
import { json } from 'stream/consumers';

interface Video {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    duration: string;
}



interface Course {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    videos: Video[];
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
    ]
};

export default function CoursePage() {
    const router = useRouter()
    const params = useParams();
    const [activeTab, setActiveTab] = useState<'videos' | 'students'>('videos');
    const course = mockCourse; // Replace with actual course data fetching

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

                </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-8">

                <div className='flex flex-col gap-[20px] '>
                    <div className='flex justify-end'>
                        <Button className='cursor-pointer' onClick={() => { }}>Enroll</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {course.videos.map((video) => (
                            <button onClick={() => {
                                sessionStorage.setItem('video', JSON.stringify(video));
                                router.push(`/student/courses/${course.id}/video`)

                            }} key={video.id} className="rounded-lg border shadow-sm overflow-hidden cursor-pointer">
                                <div className="relative h-48">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                                        {video.duration}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                                    <p className="text-sm text-gray-500">{video.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
} 