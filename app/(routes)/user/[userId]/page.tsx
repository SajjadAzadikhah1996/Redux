'use client';

import React from 'react';
import { selectUserById } from '@/_store/slice/userSlice';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector } from '@/_store/withType';
import { selectPostsByUser } from '@/_store/slice/postSlice';

export default function Page() {
    const { userId } = useParams<{ userId: string }>();
    const author = useAppSelector( state => selectUserById( state, userId ) );

    if ( !author )
        notFound();

    const posts = useAppSelector( state => selectPostsByUser( state, author.id ) );

    return (
        <React.Fragment>
            <h3 className = 'text-3xl'> by { author.name }</h3>
            <br/>
            <ul>
                {
                    posts.map( ( post ) => (
                        <li className = 'text-lg' key = { `post-${ post.id }` }><Link
                            href = { `/post/${ post.id }` }>{ post.title }</Link>
                        </li>
                    ) )
                }
            </ul>
        </React.Fragment>
    );
};
