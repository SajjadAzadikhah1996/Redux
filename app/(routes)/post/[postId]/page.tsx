'use client';

import { useParams } from 'next/navigation';
import { useAppSelector } from '@/_hooks/redux';
import { selectPostById } from '@/_store/slice/postSlice';
import Link from 'next/link';
import { selectCurrentUsername } from '@/_store/slice/authSlice';
import { ReactionButtons } from '@/_features/posts/ReactionButtons';

export default function Page() {
    const { postId } = useParams<{ postId: string }>();

    const post = useAppSelector( state => selectPostById( state, postId ) );
    const currentUsername = useAppSelector( selectCurrentUsername )!;

    if ( !post ) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    const canEdit = currentUsername === post.user;

    return (
        <section>
            <article className = 'post'>
                <h2>{ post.title }</h2>
                <p className = 'post-content'>{ post.content }</p>
                <br/>
                <ReactionButtons post = { post }/>
                { canEdit && (
                    <Link href = { `/post/${ postId }/edit` } className = 'button'>
                        Edit Post
                    </Link>
                ) }
            </article>
        </section>
    );
}