'use client';

import { Post, reactionAdded, ReactionName } from '@/_store/slice/postSlice';
import { useAppDispatch } from '@/_store/withType';


const reactionEmoji: Record<ReactionName, string> = {
    thumbsUp: '👍',
    tada: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
};

interface ReactionButtonsProps {
    post: Post;
}

export const ReactionButtons = ( { post }: ReactionButtonsProps ) => {
    const dispatch = useAppDispatch();

    const reactionButtons = Object.entries( reactionEmoji ).map(
        ( [ stringName, emoji ] ) => {
            // Ensure TS knows this is a _specific_ string type
            const reaction = stringName as ReactionName;
            return (
                <button
                    key = { reaction }
                    type = 'button'
                    className = 'muted-button reaction-button'
                    onClick = { () => dispatch( reactionAdded( { postId: post.id, reaction } ) ) }
                >
                    { emoji } { post.reactions[ reaction ] }
                </button>
            );
        }
    );

    return <div>{ reactionButtons }</div>;
};