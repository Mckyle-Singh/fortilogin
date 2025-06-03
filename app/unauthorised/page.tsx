import Link from 'next/link';

export default function UnauthorizedPage() {
   return (
      <main className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
         <div className="max-w-md text-center">
            <h1 className="text-6xl font-extrabold text-red-600 mb-4">403</h1>
            <h2 className="text-3xl font-semibold mb-6">Access Denied</h2>
            <p className="text-gray-700 mb-8">
               You do not have permission to view this page.
            </p>
            <Link
               href="/Login"
               className="inline-block px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
               Go to Home
            </Link>
         </div>
      </main>
   );
}