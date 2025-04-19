"use client";

import React, { useEffect, useState } from 'react';
import { CourseCard } from '@/components/CourseCard';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/constants/links';


interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail?: string;
}

const StudentDashboard = () => {
    const router = useRouter()
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

    // TODO: Replace this with actual API call to fetch enrolled courses
    useEffect(() => {
        // Temporary mock data - replace with actual API call
        const fetchEnrolledCourses = async () => {
            // This should be replaced with your actual API endpoint
            fetch(`${API_URL}/student/enrolled`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => res.json()).then(data => {
                console.log(data);
                setEnrolledCourses(data);
            }).catch(err => {
                console.log(err);
            })
            // const courses = [
            //     {
            //         id: '1',
            //         title: 'Introduction to React',
            //         description: 'Learn the basics of React development',
            //         thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
            //     },
            //     // Add more courses as needed
            // ];
            // setEnrolledCourses(courses);
        };

        fetchEnrolledCourses();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">My Enrolled Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrolledCourses.map((course) => (
                    <CourseCard
                        isTeacher={false}
                        key={course.id}
                        title={course.title}
                        description={course.description}
                        thumbnail={course.thumbnail}
                        viewMode="grid"
                        studentCount={0} // This won't be shown
                        onEdit={() => { }} // Empty function since we won't show edit
                        onDelete={() => { }} // Empty function since we won't show delete
                        onClick={() => {
                            // Handle course click - navigate to course details
                            // You can add navigation logic here
                            router.push(`/student/courses/${course.id}`)
                            console.log(`Navigating to course: ${course.id}`);
                        }}
                    />
                ))}
            </div>
            {enrolledCourses.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    No courses enrolled yet.
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;