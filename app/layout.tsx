import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { ThemeProvider } from 'next-themes'
import { cn } from '@/lib/utils';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import { GoogleTagManager } from '@next/third-parties/google'

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'Studace',
    description: 'Your modern personalized space for productivity, collaboration, and learning',
};

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html suppressHydrationWarning lang="en">
            <body className={cn('bg-background font-sans antialiased', fontSans.variable)}>
                <ThemeProvider attribute="class" defaultTheme='dark'>
                    <NextTopLoader 
                        showSpinner={false}
                    />
                    <GoogleTagManager gtmId="GTM-W5353JP7"/>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
