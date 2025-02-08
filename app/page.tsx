import React from 'react';
import Posts from '@/_features/posts/Posts';
import AddPostForm from '@/_ui/form/posts/AddPostForm';

export default function Home() {
    return (
        <React.Fragment>
            <AddPostForm/>
            <Posts/>
        </React.Fragment>
    );
}
