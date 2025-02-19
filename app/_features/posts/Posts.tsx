'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
    fetchPosts,
    Post,
    selectAllPosts,
    selectPostById, selectPostIds,
    selectPostsError,
    selectPostsStatus
} from '@/_store/slice/postSlice';
import dynamic from 'next/dynamic';
import { Spinner } from '@/_ui/icon/Spinner';
import { ReactionButtons } from '@/_features/posts/ReactionButtons';
import { useAppDispatch, useAppSelector } from '@/_store/withType';
import { useSelector } from 'react-redux';

const TimeAgo = dynamic( () => import('@/_ui/TimeAgo'), { ssr: false } );

interface PostExcerptProps {
    postId: string;
}

let PostExcerpt = ( { postId }: PostExcerptProps ): React.ReactNode => {
    const post = useAppSelector( ( state ) => selectPostById( state, postId ) );
    return (
        <article className = 'post-excerpt' key = { post.id }>
            <h3>
                <Link href = { `/post/${ post.id }` }>{ post.title }</Link>
            </h3>
            <div>
                <Link href = { `/user/${ post.user.id }` } className = 'underline'>{ post.user.name }</Link>
                <TimeAgo timestamp = { post.date }/>
            </div>
            <p className = 'post-content'>{ post.content.substring( 0, 100 ) }</p>
            <ReactionButtons post = { post }/>
        </article>
    );
};

PostExcerpt = React.memo( PostExcerpt );


export default function Posts() {
    // Select the `state.posts` value from the store into the component
    const posts = useAppSelector( selectAllPosts );
    const postStatus = useAppSelector( selectPostsStatus );
    const dispatch = useAppDispatch();
    const postsError = useAppSelector( selectPostsError );
    const orderedPostIds = useSelector( selectPostIds );

    useEffect( () => {
        if ( postStatus === 'idle' )
            dispatch( fetchPosts() );
    }, [ dispatch, postStatus ] );

    let content: React.ReactNode;

    if ( postStatus === 'pending' ) {
        content = <Spinner text = 'Loading...'/>;
    } else if ( postStatus === 'succeeded' ) {
        content = orderedPostIds.map( postId => (
            <PostExcerpt key = { postId } postId = { postId }/>
        ) );
    } else if ( postStatus === 'failed' ) {
        content = <div>{ postsError }</div>;
    }

    return (
        <section className = 'posts-list'>
            <h2>Posts</h2>
            { content }
        </section>
    );
};
