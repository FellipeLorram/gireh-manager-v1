'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BarChart3, Wallet, type LucideIcon, Stethoscope, ListPlus } from 'lucide-react';
import { Menu } from './menu';
import { useState } from 'react';

type MobileLink = {
  href: string;
  Icon: LucideIcon;
}

const mobileButtons: MobileLink[] = [
  { href: "/", Icon: BarChart3 },
  { href: "/orders", Icon: Wallet },
  { href: "/appointments", Icon: Stethoscope },
]

export function NavbarMobile() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className='md:hidden fixed left-0 bottom-0 w-full z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='flex justify-around items-center w-full border-t border p-4'>
          {mobileButtons.map(({ href, Icon }) => (
            <Link
              href={href}
              key={href}
              className='flex flex-col items-center justify-center'
            >
              <Icon
                className={`w-6 h-6 ${pathname === href ? "stroke-foreground" : "stroke-muted-foreground"}`}
              />
            </Link>
          ))}
          <ListPlus
            onClick={() => setMenuOpen(true)}
            className='w-6 h-6 stroke-muted-foreground'
          />
        </div>
      </div>
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className={`backdrop-animation duration-200 fixed top-0 right-0 w-full flex items-end justify-end h-screen backdrop-blur z-[49]`}>
          <div className='slide-right translate-x-full p-4 pr-10 h-full border-l bg-background z-50'>
            <Menu />
          </div>
        </div>
      )}
    </>
  )
}
