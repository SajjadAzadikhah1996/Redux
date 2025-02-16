'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/_hooks/redux';
import { selectAllUsers } from '@/_store/slice/userSlice';
import { useRouter } from 'next/navigation';
import { userLoggedIn } from '@/_store/slice/authSlice';

interface LoginPageFormFields extends HTMLFormControlsCollection {
    username: HTMLSelectElement;
}

interface LoginPageFormElements extends HTMLFormElement {
    readonly elements: LoginPageFormFields;
}

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector( selectAllUsers );
    const router = useRouter();

    const handleSubmit = ( e: React.FormEvent<LoginPageFormElements> ) => {
        e.preventDefault();

        const username = e.currentTarget.elements.username.value;
        dispatch( userLoggedIn( username ) );
        router.push( '/' );
    };

    const usersOptions = users.map( user => (
        <option key = { user.id } value = { user.id }>
            { user.name }
        </option>
    ) );

    return (
        <section>
            <h2>Welcome to Tweeter!</h2>
            <h3>Please log in:</h3>
            <form onSubmit = { handleSubmit }>
                <label htmlFor = 'username'>User:</label>
                <select id = 'username' name = 'username' required>
                    <option value = ''></option>
                    { usersOptions }
                </select>
                <button>Log In</button>
            </form>
        </section>
    );
};