'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

// This interface should match your backend data structure
interface VideoData {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    transcription: string;
}

interface CourseEnrollmentStatus {
    isEnrolled: boolean;
}

const VideoPage = () => {
    const params = useParams();
    const [videoData, setVideoData] = useState<VideoData | null>(null);
    const [isTranscriptExpanded, setIsTranscriptExpanded] = useState(false);
    const [enrollmentStatus, setEnrollmentStatus] = useState<CourseEnrollmentStatus>({ isEnrolled: true });
    const [showEnrollmentPopup, setShowEnrollmentPopup] = useState(false);

    useEffect(() => {
        // TODO: Fetch video data and enrollment status from your API
        // This is mock data for demonstration
        const mockVideoData = {
            id: params.videoId as string,
            title: "Introduction to the Course",
            description: "In this video, we'll cover the basic concepts and course overview.",
            videoUrl: "https://example.com/video.mp4",
            transcription: "This is the video transcription. It contains the full text of what was said in the video..."
        };

        const mockEnrollmentStatus = {
            isEnrolled: true // Set this based on your actual enrollment check
        };

        setVideoData(mockVideoData);
        setEnrollmentStatus(mockEnrollmentStatus);

        // Show enrollment popup if not enrolled
        if (!mockEnrollmentStatus.isEnrolled) {
            setShowEnrollmentPopup(true);
        }
    }, [params.videoId]);

    if (!videoData) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto py-8 px-4">
            {/* Video Player */}
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden mb-6">
                {enrollmentStatus.isEnrolled ? (
                    <video
                        className="w-full h-full"
                        controls
                        src={videoData.videoUrl}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                        <p>Please enroll to watch this video</p>
                    </div>
                )}
            </div>

            {/* Video Information */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">{videoData.title}</h1>
                    <p className="text-gray-600">{videoData.description}</p>
                </div>

                {/* Transcription Section */}
                <div className="border rounded-lg">
                    <button
                        onClick={() => setIsTranscriptExpanded(!isTranscriptExpanded)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                    >
                        <span className="font-semibold">Transcription</span>
                        {isTranscriptExpanded ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        )}
                    </button>

                    {isTranscriptExpanded && (
                        <div className="p-4 border-t">
                            <p className="text-gray-600 whitespace-pre-line">
                                {videoData.transcription}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Enrollment Popup */}
            {showEnrollmentPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Course Enrollment Required</h2>
                        <p className="text-gray-600 mb-6">
                            You need to be enrolled in this course to watch this video.
                            Please enroll to get full access to all course content.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <Button
                                variant="outline"
                                onClick={() => setShowEnrollmentPopup(false)}
                            >
                                Close
                            </Button>
                            <Button
                                onClick={() => {
                                    // TODO: Implement enrollment logic or navigation to enrollment page
                                    console.log('Enroll in course');
                                }}
                            >
                                Enroll Now
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default VideoPage;