
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      
      {/* ✅ Navbar */}
      <nav className="w-full bg-white shadow-lg px-6 py-4 flex justify-between items-center">
        {/* Left-side navigation links */}
        <div className="flex space-x-6">
          <Link href="/" className="text-xl font-bold text-gray-900">FortiLogin</Link>
          <Link href="/features" className="hover:text-gray-600 transition">Features</Link>
          <Link href="/pricing" className="hover:text-gray-600 transition">Pricing</Link>
          <Link href="/security" className="hover:text-gray-600 transition">Security</Link>
        </div>

        {/* ✅ Right-side authentication links - Light theme */}
        <div className="flex space-x-4">
          <Link href="/Login" className="text-blue-600 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
            Login
          </Link>
          <Link href="/Register" className="text-blue-600 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
            Register
          </Link>
        </div>
      </nav>

      {/* ✅ Hero Section - Light Styling */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-6 py-20 bg-white shadow-lg rounded-lg">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Secure Your Digital Identity Now</h1>
        <p className="text-lg text-gray-600 mb-6">End-to-end encryption and seamless authentication with FortiLogin.</p>
        <div className="flex space-x-4">
          <Link href="/signup" className="bg-blue-500 px-6 py-3 rounded-lg text-white hover:bg-blue-600 transition">Get Started</Link>
          <Link href="/learn" className="border border-gray-400 px-6 py-3 rounded-lg text-gray-600 hover:bg-gray-200 transition">Learn More</Link>
        </div>
      </main>

      {/* ✅ Feature Cards - Light UI */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-900 mt-4">🔐 End-to-End Encryption</h3>
          <p className="text-gray-600 mt-2">Your data stays encrypted at all times, ensuring total privacy and security.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-900 mt-4">🛡 Multi-Factor Authentication</h3>
          <p className="text-gray-600 mt-2">Secure logins with biometric authentication or one-time passcodes.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-900 mt-4">✅ OAuth & JWT Security</h3>
          <p className="text-gray-600 mt-2">Industry-standard authentication protocols ensuring safe logins.</p>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="py-6 text-center text-gray-600">
        <p>🔒 Fortified with AES-256 encryption, GDPR compliance, and secure authentication.</p>
      </footer>   
    </div>
  );
}
