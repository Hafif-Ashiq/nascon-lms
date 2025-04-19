'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    const links = [
        {
            href: '/student',
            label: 'My Courses'
        },
        {
            href: '/student/chats',
            label: 'Explore all Courses'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="border-b">
                <div className="container mx-auto px-4">
                    <div className="flex space-x-6 h-14 items-center">
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
            </nav>
            <main className="flex-1 container mx-auto px-4 py-6">
                {children}
            </main>
        </div>
    );
}
