import React from 'react';

interface TailwindWrapperProps {
    children: React.ReactNode;
    tailwindClass?: string;
}

const TailwindWrapper: React.FC<TailwindWrapperProps> = ({
    children,
    tailwindClass,
}) => {
    return (
        <div
            className={`bg-background-secondary dark:bg-dark-background-secondary text-element-secondary dark:text-dark-element-primary border-3 
            border-element-secondary dark:border-dark-element-secondary shadow-light dark:shadow-dark rounded-lg ${tailwindClass}`}>
            {children}
        </div>
    );
};

export default TailwindWrapper;
