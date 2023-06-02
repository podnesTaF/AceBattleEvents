"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {Button, IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import TollIcon from '@mui/icons-material/Toll';
import CustomDrawer from "@/components/CustomDrawer";
import {useState} from "react";


const AppBar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname()
  return (
    <>
        <div className="lg:flex justify-between px-5 py-4 bg-[#1E1C1F] items-center">
            <div className={'flex justify-between items-center'}>
                <IconButton onClick={() => setOpen(true)} className={'text-white lg:hidden items-center'}>
                    <MenuIcon sx={{ fontSize: 40 }} />
                </IconButton>
                <h2 className={'text-3xl lg:text-4xl uppercase text-white'}>Ace Battle Events</h2>
            </div>
            <nav className={'hidden lg:flex gap-4 items-center'}>
                <Link className="hover:opacity-80" href="/">
                    <p className={`text-xl uppercase ${pathname === '/' ? 'text-[#FF0000]' : 'text-white'}`}>Home</p>
                </Link>
                <Link className="hover:opacity-80" href="/calendar">
                    <p className={`text-xl uppercase ${pathname === '/calendar' ? 'text-[#FF0000]' : 'text-white'}`}>Calendar</p>
                </Link>
                <Link className="hover:opacity-80" href="/close-events">
                    <p className={`text-xl uppercase ${pathname === '/close-events' ? 'text-[#FF0000]' : 'text-white'}`}>Close Events</p>
                </Link>
                {session?.user ? (
                    <>
                        <Link className="hover:opacity-80" href="/register-team">
                            <p className={`text-xl uppercase ${pathname === '/register-team' ? 'text-[#FF0000]' : 'text-white'}`}>Register Team</p>
                        </Link>

                        <div className={'flex items-center justify-center'}>
                            <TollIcon className={'text-yellow-400'} />
                            <p className={'ml-2 text-white text-xl'}>
                                {session?.user?.balance} bc
                            </p>
                        </div>
                        <Button
                            variant="outlined"
                            color="error"
                            className={'p-1'}
                            onClick={() => router.push('/profile/1')}
                        >
                            <PersonIcon className={'text-white'} fontSize={'large'} />
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            className={'p-1'}
                            onClick={() => signOut()}
                        >
                            <LogoutIcon className={'text-white'} fontSize={'large'} />
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => signIn()}
                        >
                            Sign up
                        </Button>
                        <Button
                            variant="outlined"
                            color="warning"
                            onClick={() => signIn()}
                        >
                            Sign In
                        </Button>
                    </>
                )}
            </nav>
        </div>
        <CustomDrawer setOpen={setOpen} open={open}/>
    </>
  );
};

export default AppBar;
