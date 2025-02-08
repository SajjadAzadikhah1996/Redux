'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/_hooks/redux';
import { useRouter } from 'next/navigation';
import { postUpdated, selectPostById } from '@/_store/slice/postSlice';

// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface EditPostFormFields extends HTMLFormControlsCollection {
    postTitle: HTMLInputElement;
    postContent: HTMLTextAreaElement;
}

interface EditPostFormElements extends HTMLFormElement {
    readonly elements: EditPostFormFields;
}

export default function EditPostForm( { postId }: { postId: string } ) {

    const post = useAppSelector( state => selectPostById( state, postId ) );

    const dispatch = useAppDispatch();
    const router = useRouter();

    if ( !post ) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    const onSavePostClicked = ( e: React.FormEvent<EditPostFormElements> ) => {
        // Prevent server submission
        e.preventDefault();

        const { elements } = e.currentTarget;
        const title = elements.postTitle.value;
        const content = elements.postContent.value;

        if ( title && content ) {
            dispatch( postUpdated( { id: post.id, title, content } ) );
            router.push( `/post/${ post.id }` );
        }
    };

    return (
        <section>
            <h2>Edit Post</h2>
            <form onSubmit = { onSavePostClicked } className = 'flex gap-x-8 items-center'>
                <label htmlFor = 'postTitle'>Post Title:</label>
                <input
                    type = 'text'
                    id = 'postTitle'
                    name = 'postTitle'
                    defaultValue = { post.title }
                    required
                    className = 'border-2'
                />
                <label htmlFor = 'postContent'>Content:</label>
                <textarea
                    id = 'postContent'
                    name = 'postContent'
                    defaultValue = { post.content }
                    required
                    className = 'border-2'
                />

                <button className = 'border-2 px-4 py-2'>Save Post</button>
            </form>
        </section>
    );
}