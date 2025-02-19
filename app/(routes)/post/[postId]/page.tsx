'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ReactionButtons } from '@/_features/posts/ReactionButtons';
import { useAppSelector } from '@/_store/withType';
import { selectCurrentUser } from '@/_store/slice/authSlice';
import { useGetPostQuery } from '@/_store/api';
import { Spinner } from '@/_ui/icon/Spinner';
import React from 'react';
import TimeAgo from '@/_ui/TimeAgo';

export default function Page() {
    const { postId } = useParams<{ postId: string }>();
    const { data: post, isFetching, isSuccess } = useGetPostQuery( postId! );

    const currentUser = useAppSelector( selectCurrentUser )!;

    if ( isFetching )
        return <Spinner text = 'Loading...'/>;

    if ( !post ) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }
    let content: React.ReactNode;
    const canEdit = currentUser.id === post.user.id;

    if ( isFetching ) {
        content = <Spinner text = 'Loading...'/>;
    } else if ( isSuccess ) {
        content = (
            <article className = 'post'>
                <h2>{ post.title }</h2>
                <div>
                    <Link href = { `/user/${ post.user.id }` } className = 'underline'>{ post.user.name }</Link>
                    <TimeAgo timestamp = { post.date }/>
                </div>
                <p className = 'post-content'>{ post.content }</p>
                <ReactionButtons post = { post }/>
                { canEdit && (
                    <Link href = { `/post//${ post.id }/edit` } className = 'button'>
                        Edit Post
                    </Link>
                ) }
            </article>
        );
    }

    return <section>{ content }</section>;
}