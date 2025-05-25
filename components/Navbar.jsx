import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
      <div className="text-xl font-bold">
        <Link href="/">
          MyRecipeApp
        </Link>
      </div>
      <div>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : session ? (
          <>
            <span className="mr-4">Salut, {session.user.name}!</span>
            <button
              onClick={() => signOut()}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Deconectează-te
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
          >
            Conectează-te
          </button>
        )}
      </div>
    </nav>
  );
}
