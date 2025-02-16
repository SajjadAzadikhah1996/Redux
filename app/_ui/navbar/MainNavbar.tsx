'use client';

import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/_hooks/redux';
import { selectCurrentUser } from '@/_store/slice/userSlice';
import { userLoggedOut } from '@/_store/slice/authSlice';
import { UserIcon } from '@/_ui/icon/UserIcon';

export default function MainNavbar() {
    const dispatch = useAppDispatch();
    const user = useAppSelector( selectCurrentUser );

    const isLoggedIn = !!user;

    let navContent: React.ReactNode = null;

    if ( isLoggedIn ) {
        const onLogoutClicked = () => {
            dispatch( userLoggedOut() );
        };

        navContent = (
            <div className = 'navContent'>
                <div className = 'navLinks'>
                    <Link href = '/'>Posts</Link>
                </div>
                <div className = 'userDetails'>
                    <UserIcon size = { 32 }/>
                    { user.name }
                    <button className = 'button small' onClick = { onLogoutClicked }>
                        Log Out
                    </button>
                </div>
            </div>
        );
    }


    return (
        <nav>
            <section>
                <h1>Redux Essentials Example</h1>
                { navContent }
            </section>
        </nav>
    );
}