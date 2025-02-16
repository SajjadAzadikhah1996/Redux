import React from 'react';
import Posts from '@/_features/posts/Posts';
import AddPostForm from '@/_ui/form/posts/AddPostForm';
import ProtectedRoute from '@/_ui/layout/ProtectedRoute';

export default function Home() {
    return (
        <ProtectedRoute>
            <AddPostForm/>
            <Posts/>
        </ProtectedRoute>
    );
}
