import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'CVBuilder - Professional CV Creator',
  description: 'Create and download professional, ATS-friendly CVs and resumes in minutes with live preview and customizable templates.',
  openGraph: {
    title: 'CVBuilder - Professional CV Creator',
    description: 'Create and download professional, ATS-friendly CVs and resumes in minutes with live preview and customizable templates.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CVBuilder - Professional CV Creator',
    description: 'Create and download professional, ATS-friendly CVs and resumes in minutes with live preview and customizable templates.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
