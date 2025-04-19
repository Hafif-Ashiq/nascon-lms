"use client";

import React, { useEffect, useState } from 'react';
import { CourseCard } from '@/components/CourseCard';
import { API_URL } from '@/constants/links';

interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail?: string;
}

const page = () => {
    const [allCourses, setAllCourses] = useState<Course[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

    // TODO: Replace this with actual API call to fetch enrolled courses
    useEffect(() => {
        // Temporary mock data - replace with actual API call
        const fetchAllCourses = async () => {
            fetch(`${API_URL}/student/courses`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => res.json()).then(data => {
                console.log(data);
                setAllCourses(data);
            }).catch(err => {
                console.log(err);
            })
            // This should be replaced with your actual API endpoint
            // const courses = [
            //     {
            //         id: '1',
            //         title: 'Introduction to React',
            //         description: 'Learn the basics of React development',
            //         thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
            //     },
            //     // Add more courses as needed
            // ];
            // setAllCourses(courses);
            // setFilteredCourses(courses);
        };

        fetchAllCourses();
    }, []);

    // Handle search functionality
    useEffect(() => {
        const filtered = allCourses.filter(course =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCourses(filtered);
    }, [searchQuery, allCourses]);

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-between">
                <h1 className="text-2xl font-bold mb-4">All Courses</h1>
                <div className="relative min-w-[400px]">
                    <input

                        type="text"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCourses.map((course) => (
                    <CourseCard
                        isTeacher={false}
                        key={course.id}
                        title={course.title}
                        description={course.description}
                        thumbnail={course.thumbnail}
                        viewMode="grid"
                        studentCount={0}
                        onEdit={() => { }}
                        onDelete={() => { }}
                        onClick={() => {
                            console.log(`Navigating to course: ${course.id}`);
                        }}
                    />
                ))}
            </div>
            {filteredCourses.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    {searchQuery ? 'No courses found matching your search.' : 'No courses available yet.'}
                </div>
            )}
        </div>
    );
};

export default page;