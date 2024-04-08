import React from 'react';

type PaginationProps = {
    handlePageChange: (page: number) => void;
    currentPage: number;
};

const Pagination = ({ handlePageChange, currentPage }: PaginationProps) => {
    const renderButtons = () => {
        const buttons = [];
        for (let i = 1; i <= 10; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`w-10 h-10 px-2 py-1 mx-1 text-sm font-semibold text-white rounded-md transition-all ease-in 2s ${
                        i === currentPage ? 'bg-red-500' : 'bg-light-card dark:bg-dark-card'
                    }`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className='my-6'>
            {renderButtons()}
        </div>
    );
};

export default Pagination;

