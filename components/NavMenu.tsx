import Link from "next/link";

export default function NavMenu() {
  const linkStyle = 'border-4 border-yellow-500 px-2 py-1 w-48 bg-zinc-800 text-center text-xl text-yellow-200 hover:underline hover:scale-105 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300';

  return (
    <nav className='my-4 w-full flex gap-x-12 justify-center'>
      <Link href='/' className={linkStyle}> 
        Home 
      </Link>
      <Link href='/team-builder' className={linkStyle}> 
        Team Builder 
      </Link>
      <Link href='/type-data' className={linkStyle}> 
        Type Data
      </Link>
    </nav>
  );
}