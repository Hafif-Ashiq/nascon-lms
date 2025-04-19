'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';

const page = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        thumbnail: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    const handleFileSelect = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({
                ...prev,
                thumbnail: reader.result as string
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-8">Add New Course</h1>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Course Thumbnail
                    </label>
                    <FileUpload
                        onFileSelect={handleFileSelect}
                        currentFile={formData.thumbnail}
                        className="mt-1"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Course Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter course name"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter course description"
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <Button type="submit">
                        Create Course
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default page