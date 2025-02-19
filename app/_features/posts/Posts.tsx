'use client';

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
    fetchPosts,
    Post,
    selectPostsStatus
} from '@/_store/slice/postSlice';
import dynamic from 'next/dynamic';
import { Spinner } from '@/_ui/icon/Spinner';
import { ReactionButtons } from '@/_features/posts/ReactionButtons';
import { useAppDispatch, useAppSelector } from '@/_store/withType';
import { useGetPostsQuery } from '@/_store/api';

const TimeAgo = dynamic( () => import('@/_ui/TimeAgo'), { ssr: false } );

interface PostExcerptProps {
    post: Post;
}

let PostExcerpt = ( { post }: PostExcerptProps ): React.ReactNode => {
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
    const { data: posts = [], isLoading, isSuccess, isError, error } = useGetPostsQuery();

    const sortedPosts = useMemo(() => {
        const sortedPosts = posts.slice()
        // Sort posts in descending chronological order
        sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
        return sortedPosts
    }, [posts])

    const postStatus = useAppSelector( selectPostsStatus );
    const dispatch = useAppDispatch();

    useEffect( () => {
        if ( postStatus === 'idle' )
            dispatch( fetchPosts() );
    }, [ dispatch, postStatus ] );

    let content: React.ReactNode;

    if ( isLoading ) {
        content = <Spinner text = 'Loading...'/>;
    } else if ( isSuccess ) {
        content = sortedPosts.map( post => <PostExcerpt key = { post.id } post = { post }/> );
    } else if ( isError ) {
        content = <div>{ JSON.stringify( error ) }</div>;
    }

    return (
        <section className = 'posts-list'>
            <h2>Posts</h2>
            { content }
        </section>
    );
};
