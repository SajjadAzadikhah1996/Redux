'use client';

import React from 'react';
import { selectAllUsers, User } from '@/_store/slice/userSlice';
import { useRouter } from 'next/navigation';
import { login } from '@/_store/slice/authSlice';
import { useAppDispatch, useAppSelector } from '@/_store/withType';

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

    const handleSubmit = async ( e: React.FormEvent<LoginPageFormElements> ) => {
        e.preventDefault();

        const user = users.find( ( user ) => user.id === e.currentTarget.elements.username.value ) as User;
        await dispatch( login( user ) );
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