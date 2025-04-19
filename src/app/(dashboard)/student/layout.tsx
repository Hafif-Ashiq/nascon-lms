'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="border-b">
                <div className="container mx-auto px-4">
                    <div className="flex space-x-6 h-14 items-center">
                        <Link
                            href="/student/my-courses"
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/student/my-courses'
                                ? 'text-black border-b-2 border-black'
                                : 'text-muted-foreground'
                                }`}
                        >
                            My Courses
                        </Link>
                        <Link
                            href="/student/explore"
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === '/student/explore'
                                ? 'text-black border-b-2 border-black'
                                : 'text-muted-foreground'
                                }`}
                        >
                            Explore Courses
                        </Link>
                    </div>
                </div>
            </nav>
            <main className="flex-1 container mx-auto px-4 py-6">
                {children}
            </main>
        </div>
    );
}
