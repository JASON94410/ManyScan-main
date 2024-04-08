import React from 'react';

type PaginationProps = {
    handlePageChange: (page: number) => void;
    currentPage: number;
};

const Pagination = ({ handlePageChange, currentPage }: PaginationProps) => {

    const renderButtons = () => {
        const buttons = [];
        for (let i = 1; i <= 4; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`w-10 h-10 mx-1 text-sm font-semibold rounded-t-md transition-all ease-in 2s ${
                        i === currentPage ? 'bg-element-secondary text-background-primary' : 'bg-none text-element-secondary'
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
        <div className='m'>
            {renderButtons()}
        </div>
    );
};

export default Pagination;

