import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-stone-50 text-stone-800">
      <h2 className="text-3xl font-extrabold text-stone-900 mb-2">404 - Page Not Found</h2>
      <p className="text-stone-600 text-sm mb-6 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition"
      >
        Return to CV Builder
      </Link>
    </div>
  );
}
