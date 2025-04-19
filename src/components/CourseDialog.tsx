import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CourseDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: { title: string; description: string; thumbnail?: string }) => void;
    initialData?: {
        title: string;
        description: string;
        thumbnail?: string;
    };
}

export function CourseDialog({
    isOpen,
    onOpenChange,
    onSubmit,
    initialData,
}: CourseDialogProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, description, thumbnail });
        onOpenChange(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                    <h2 className="text-2xl font-semibold leading-none tracking-tight">
                        {initialData ? 'Edit Course' : 'Add New Course'}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {initialData
                            ? 'Make changes to your course here.'
                            : 'Fill in the details to create a new course.'}
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Course title"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Course description"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="thumbnail">Thumbnail URL</Label>
                            <Input
                                id="thumbnail"
                                type="url"
                                value={thumbnail}
                                onChange={(e) => setThumbnail(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                            />
                            {thumbnail && (
                                <div className="mt-2">
                                    <img
                                        src={thumbnail}
                                        alt="Course thumbnail preview"
                                        className="w-full h-32 object-cover rounded-md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            {initialData ? 'Save Changes' : 'Create Course'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
} 