'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '@/_store/slice/userSlice';
import Link from 'next/link';

export default function Page() {
    const users = useSelector( selectAllUsers );

    return (
        <section>
            {
                users.map( ( user ) => (
                    <div key = { `user-${ user.id }` }>
                        <Link href = { `/user/${ user.id }` }> { user.name }</Link>
                    </div>
                ) )
            }
        </section>
    );
};
