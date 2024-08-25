'use client';

import { FileClock, Home, Settings, SquareUser, UserRound, WalletCards } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function SideNav() {
    const router = useRouter();  
    const path = usePathname();

    const MenuList = [
        {
            name: "Home",
            icon: Home,
            path: '/dashboard'
        },
        {
            name: "About",
            icon: UserRound,
            path: '/about'
        },
        {
            name: "Contact",
            icon: SquareUser,
            path: '/contact'
        },
        
    ];

    useEffect(() => {
        console.log(path);
    }, [path]);

    return (
        <div className='h-screen relative p-5 shadow-sm border bg-white'>
            <div className='flex justify-center'>
            <Link href={'/'}>
                <Image src={'/logo.svg'} alt='logo' width={100} height={100} />
                </Link>
            </div>
            <hr className='my-6 border' />
            <div className='mt-3'>
                {MenuList.map((menu, index) => (
                    <div
                        key={index}
                        className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center ${path === menu.path && 'bg-primary text-white'}`}
                        onClick={() => router.push(menu.path)}  
                    >
                        <menu.icon className='h-6 w-6' />
                        <h2 className='text-lg'>{menu.name}</h2>
                    </div>
                ))}
            </div>
            <div>
            <a href="/dashboard/youtube-keyword-research"  className="relative px-5 py-2 font-medium text-white group ">
<span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
<span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
<span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
<span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
<span className="relative">Keyword Research</span>
</a>
            </div>
        </div>
    );
}

export default SideNav;
