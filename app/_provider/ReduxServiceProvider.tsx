'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from '@/_store/store';
import { fetchUsers } from '@/_store/slice/userSlice';
import { getUser } from '@/_store/slice/authSlice';

export default function ReduxServiceProvider( { children }: Readonly<{ children: React.ReactNode }> ) {
    store.dispatch( getUser() );
    store.dispatch( fetchUsers() );

    return (
        <Provider store = { store }>
            { children }
        </Provider>
    );
}