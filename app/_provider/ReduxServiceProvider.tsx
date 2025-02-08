'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from '@/_store/store';

export default function ReduxServiceProvider( { children }: Readonly<{ children: React.ReactNode }> ) {
    return (
        <Provider store = { store }>
            { children }
        </Provider>
    );
}