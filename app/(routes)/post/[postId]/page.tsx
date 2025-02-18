'use client';

import { useParams } from 'next/navigation';
import { selectPostById } from '@/_store/slice/postSlice';
import Link from 'next/link';
import { ReactionButtons } from '@/_features/posts/ReactionButtons';
import { useAppSelector } from '@/_store/withType';
import { selectCurrentUser } from '@/_store/slice/authSlice';

export default function Page() {
    const { postId } = useParams<{ postId: string }>();

    const post = useAppSelector( state => selectPostById( state, postId ) );
    const currentUser = useAppSelector( selectCurrentUser )!;

    if ( !post ) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    const canEdit = currentUser.id === post.user.id;

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