'use client';

import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, reset, selectCount } from '@/app/_store/slice/counterSlice';

export default function Counter() {
    const count = useSelector( selectCount );
    const dispatch = useDispatch();

    return (
        <section className = 'w-full h-svh flex flex-col justify-center items-center'>
            <span className = 'text-3xl'>
                { count }
            </span>
            <br/>
            <div className = 'flex gap-x-4'>
                <button className = 'bg-gray-800 px-4 py-2' onClick = { () => dispatch( increment( 1 ) ) }>Increment
                </button>
                <button className = 'bg-gray-800 px-4 py-2' onClick = { () => dispatch( reset() ) }>Reset
                </button>
                <button className = 'bg-gray-800 px-4 py-2' onClick = { () => dispatch( decrement( 1 ) ) }>Decrement
                </button>
            </div>
        </section>
    );
}