'use client';

interface Props {
    title: string;
}

export default function CardTitle(props: Props) {
    return (
        <span className='font-semibold uppercase text-md text-dark dark:text-light opacity-80'>
            {props.title}
        </span>
    );
}
