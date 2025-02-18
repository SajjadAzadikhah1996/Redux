'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAppSelector } from '@/_store/withType';
import { selectAuthStatus, selectCurrentUser } from '@/_store/slice/authSlice';

export default function ProtectedRoute( { children }: { children: React.ReactNode } ) {
    const user = useAppSelector( selectCurrentUser );
    const status = useAppSelector( selectAuthStatus );
    const router = useRouter();

    useEffect( () => {
        if ( status === 'idle' && !user )
            router.push( '/login' );
    }, [ user, status ] );

    if ( !user ) {
        return null;
    }
    return children;
};