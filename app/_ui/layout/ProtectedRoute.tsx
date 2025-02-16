'use client';

import { useAppSelector } from '@/_hooks/redux';
import { selectCurrentUsername } from '@/_store/slice/authSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function ProtectedRoute( { children }: { children: React.ReactNode } ) {
    const username = useAppSelector( selectCurrentUsername );
    const router = useRouter();

    useEffect( () => {
        if ( !username )
            router.push( '/login' );
    }, [ username ] );

    if ( !username ) {
        return null;
    }
    return children;
};