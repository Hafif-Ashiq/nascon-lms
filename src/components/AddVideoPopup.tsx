'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';

interface AddVideoPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        video: File;
        title: string;
        description: string;
    }) => void;
}

const AddVideoModal = ({ isOpen, onClose, onSubmit }: AddVideoPopupProps) => {
    const [formData, setFormData] = useState({
        video: null as File | null,
        title: '',
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.video || !formData.title || !formData.description) return;

        onSubmit({
            video: formData.video,
            title: formData.title,
            description: formData.description
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#00000090] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Add New Video</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Video File
                        </label>
                        <FileUpload
                            type='video'
                            onFileSelect={(file) => setFormData(prev => ({ ...prev, video: file }))}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            rows={4}
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Add Video
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVideoModal;