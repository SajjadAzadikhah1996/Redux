'use client';

import React from 'react';
import { useAppSelector } from '@/_hooks/redux';
import Link from 'next/link';
import { selectAllPosts } from '@/_store/slice/postSlice';

export default function Posts() {
    // Select the `state.posts` value from the store into the component
    const posts = useAppSelector( selectAllPosts );

    const renderedPosts = posts.map( post => (
        <article className = 'post-excerpt' key = { post.id }>
            <h3><Link href = { `/post/${ post.id }` }>{ post.title }</Link></h3>
            <p className = 'post-content'>{ post.content.substring( 0, 100 ) }</p>
        </article>
    ) );

    return (
        <section className = 'posts-list'>
            <h2>Posts</h2>
            { renderedPosts }
        </section>
    );
};
