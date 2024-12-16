import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full bg-gray-100">
      <div className="px-8 py-3 border-b border-gray-300">
        <p className="text-gray-500">India</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 px-8 py-3">
        <div className="flex justify-center md:justify-start space-x-8">
          <Link href="/advertising" className="text-gray-500 hover:underline">Advertising</Link>
          <Link href="/business" className="text-gray-500 hover:underline">Business</Link>
          <Link href="/how-search-works" className="text-gray-500 hover:underline">How Search works</Link>
        </div>
        <div className="flex justify-center space-x-8">
          <Link href="/privacy" className="text-gray-500 hover:underline">Privacy</Link>
          <Link href="/terms" className="text-gray-500 hover:underline">Terms</Link>
          <Link href="/settings" className="text-gray-500 hover:underline">Settings</Link>
        </div>
      </div>
    </footer>
  );
}