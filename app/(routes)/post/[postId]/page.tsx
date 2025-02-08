'use client';

import { useParams } from 'next/navigation';
import { useAppSelector } from '@/_hooks/redux';
import { selectPostById } from '@/_store/slice/postSlice';
import Link from 'next/link';

export default function Page() {
    const { postId } = useParams<{ postId: string }>();

    const post = useAppSelector( state => selectPostById( state, postId ) );

    if ( !post ) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    return (
        <section>
            <article className = 'post'>
                <h2>{ post.title }</h2>
                <p className = 'post-content'>{ post.content }</p>
                <br/>
                <Link href = { `/post/${ postId }/edit` } className = 'px-4 py-2 text-white bg-[var(--redux-color)]'>Edit</Link>
            </article>
        </section>
    );
}