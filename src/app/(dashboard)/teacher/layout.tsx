'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TeacherLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    const links = [
        {
            href: '/teacher',
            label: 'Home'
        },
        {
            href: '/teacher/chats',
            label: 'Chats'
        }
    ];

    return (
        <div className="flex flex-col h-screen">
            {/* Top Navigation Bar */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex space-x-4">
                            {links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${isActive
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    );
}

