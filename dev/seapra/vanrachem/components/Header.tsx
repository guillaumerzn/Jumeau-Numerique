import React from 'react';
import Image from 'next/image';
import { LayoutGrid } from 'lucide-react';
import { useRouter } from 'next/navigation';



export default function Header() {

  const router = useRouter();

  const handleLogoClicked = () => {
    router.push("/home");
  };
  return (
    <header className="py-8 px-0 sm:px-4 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center flex items-center">
          <div className="flex items-center bg-gray-200 p-2 rounded-xl hover:shadow-md cursor-pointer">
          <a onClick={handleLogoClicked} className="cursor-pointer">
          <LayoutGrid className="w-8 h-8 opacity-75" />
          </a>
          </div>
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight">
              Jumeau numérique
            </h1>
            <p className="mt-3 text-xl text-[var(--foreground)]/50 ">
              Portail d'accès à la santé collaborative
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
