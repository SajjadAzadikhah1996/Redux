'use client';

import React from 'react';

// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddPostFormFields extends HTMLFormControlsCollection {
    postTitle: HTMLInputElement;
    postContent: HTMLTextAreaElement;
    postAuthor: HTMLSelectElement;
}

interface AddPostFormElements extends HTMLFormElement {
    readonly elements: AddPostFormFields;
}

import { useAppDispatch, useAppSelector } from '@/_hooks/redux';
import { postAdded } from '@/_store/slice/postSlice';
import { selectAllUsers } from '@/_store/slice/userSlice';

export default function AddPostForm() {
    const dispatch = useAppDispatch();
    const users = useAppSelector( selectAllUsers );

    const handleSubmit = ( e: React.FormEvent<AddPostFormElements> ) => {
        // Prevent server submission
        e.preventDefault();

        const { elements } = e.currentTarget;
        const title = elements.postTitle.value;
        const content = elements.postContent.value;
        const userId = elements.postAuthor.value;

        dispatch( postAdded( title, content, userId ) );

        e.currentTarget.reset();
    };

    const usersOptions = users.map( user => (
        <option key = { user.id } value = { user.id }>
            { user.name }
        </option>
    ) );


    return (
        <section>
            <h2>Add a New Post</h2>
            <form onSubmit = { handleSubmit } className = 'flex gap-x-8 items-center'>
                <label htmlFor = 'postTitle'>Post Title:</label>
                <input type = 'text' id = 'postTitle' defaultValue = '' required className = 'border-2'/>
                <label htmlFor = 'postAuthor'>Author:</label>
                <select id = 'postAuthor' name = 'postAuthor' required className = 'border-2'>
                    <option value = ''></option>
                    { usersOptions }
                </select>
                <label htmlFor = 'postContent'>Content:</label>
                <textarea
                    id = 'postContent'
                    name = 'postContent'
                    defaultValue = ''
                    required className = 'border-2'
                />
                <button className = 'border-2 px-4 py-2'>Save Post</button>
            </form>
        </section>
    );
}