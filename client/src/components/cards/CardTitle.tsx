'use client';

interface Props {
    title: string;
}

import React from 'react';

const CardTitle: React.FC<Props> = ({title}) => {
    return (
        <h2 className='uppercase text-lg text-element-secondary dark:text-dark-element-primary'>
            {title}
        </h2>
    );
};

export default CardTitle;