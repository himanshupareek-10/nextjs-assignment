import Link from 'next/link';

export function Header() {
  return (
    <header className="flex justify-between items-center p-5 text-sm">
      <div className="flex space-x-4">
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/store" className="hover:underline">Store</Link>
      </div>
      <div className="flex space-x-4 items-center">
        <Link href="/gmail" className="hover:underline">Gmail</Link>
        <Link href="/images" className="hover:underline">Images</Link>
        <button className="bg-google-blue text-white px-6 py-2 rounded-md hover:brightness-105">
          Sign in
        </button>
      </div>
    </header>
  );
}