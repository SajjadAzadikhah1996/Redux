'use client';

import React, { useState } from 'react';

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

import { useAppDispatch, useAppSelector } from '@/_store/withType';
import { addNewPost } from '@/_store/slice/postSlice';
import { selectCurrentUser } from '@/_store/slice/authSlice';
import { useAddNewPostMutation } from '@/_store/api';

export default function AddPostForm() {
    const dispatch = useAppDispatch();
    const user = useAppSelector( selectCurrentUser )!;
    const [ addNewPost, { isLoading } ] = useAddNewPostMutation();

    const [ addRequestStatus, setAddRequestStatus ] = useState<'idle' | 'pending'>( 'idle' );

    const handleSubmit = async ( e: React.FormEvent<AddPostFormElements> ) => {
        // Prevent server submission
        e.preventDefault();

        const { elements } = e.currentTarget;
        const title = elements.postTitle.value;
        const content = elements.postContent.value;

        const form = e.currentTarget;

        try {
            await addNewPost( { title, content, userId: user.id } ).unwrap();
            form.reset();
        } catch ( err ) {
            console.error( 'Failed to save the post: ', err );
        } finally {
            setAddRequestStatus( 'idle' );
        }
    };

    return (
        <section>
            <h2>Add a New Post</h2>
            <form onSubmit = { handleSubmit } className = 'flex gap-x-8 items-center'>
                <label htmlFor = 'postTitle'>Post Title:</label>
                <input type = 'text' id = 'postTitle' defaultValue = '' required className = 'border-2'/>
                <label htmlFor = 'postContent'>Content:</label>
                <textarea
                    id = 'postContent'
                    name = 'postContent'
                    defaultValue = ''
                    required className = 'border-2'
                />
                <button className = 'border-2 px-4 py-2' disabled = { isLoading }>Save Post
                </button>
            </form>
        </section>
    );
}