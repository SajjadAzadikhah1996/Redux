import React from 'react';
import EditPostForm from '@/_ui/form/posts/EditPostForm';

export default async function Page( { params }: { params: Promise<{ postId: string }> } ) {
    const { postId } = await params;

    return (
        <EditPostForm postId = { postId }/>
    );
};
