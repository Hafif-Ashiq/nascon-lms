'use client';
import { useState } from 'react';
import { CourseCard } from "@/components/CourseCard";
import { useRouter } from 'next/navigation';


interface Course {
    id: number;
    title: string;
    description: string;
    studentCount: number;
    thumbnail: string;
}

export default function DashboardPage() {
    const router = useRouter()
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
    const [courses, setCourses] = useState<Course[]>([
        {
            id: 1,
            title: "Introduction to Programming",
            description: "Learn the basics of programming with Python",
            studentCount: 45,
            thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 2,
            title: "Web Development Fundamentals",
            description: "Master HTML, CSS, and JavaScript",
            studentCount: 32,
            thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 3,
            title: "Data Structures and Algorithms",
            description: "Advanced programming concepts and problem solving",
            studentCount: 28,
            thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 4,
            title: "Data Structures and Algorithms",
            description: "Advanced programming concepts and problem solving",
            studentCount: 28,
            thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
    ]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const handleEdit = (courseId: number) => {
        const course = courses.find(c => c.id === courseId);
        if (course) {
            setEditingCourse(course);
            setFormData({
                title: course.title,
                description: course.description,
            });
            setIsDialogOpen(true);
        }
    };

    const handleDelete = (courseId: number) => {
        setCourses(courses.filter(course => course.id !== courseId));
    };

    const handleAddCourse = () => {
        router.push("/teacher/add-course")
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCourse) {
            setCourses(courses.map(course =>
                course.id === editingCourse.id
                    ? { ...course, ...formData }
                    : course
            ));
        } else {
            setCourses([
                ...courses,
                {
                    id: Math.max(...courses.map(c => c.id)) + 1,
                    ...formData,
                    studentCount: 0,
                    thumbnail: ""
                },
            ]);
        }
        setIsDialogOpen(false);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Courses</h1>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-100'
                                }`}
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
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-100'
                                }`}
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
                                <line x1="8" y1="6" x2="21" y2="6" />
                                <line x1="8" y1="12" x2="21" y2="12" />
                                <line x1="8" y1="18" x2="21" y2="18" />
                                <line x1="3" y1="6" x2="3.01" y2="6" />
                                <line x1="3" y1="12" x2="3.01" y2="12" />
                                <line x1="3" y1="18" x2="3.01" y2="18" />
                            </svg>
                        </button>
                    </div>
                    <button
                        onClick={handleAddCourse}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Add New Course
                    </button>
                </div>
            </div>

            {viewMode == "grid" && <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`
            }>
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        title={course.title}
                        description={course.description}
                        studentCount={course.studentCount}
                        onClick={() => router.push(`/teacher/${course.id}`)}
                        onEdit={() => handleEdit(course.id)}
                        onDelete={() => handleDelete(course.id)}
                        viewMode={viewMode}
                        thumbnail={course.thumbnail}
                    />
                ))}
            </div>}


        </div>
    );
} 