'use client';
import React from 'react';

interface Props {
    value: boolean;
    onChangeHandler: (val: boolean) => void;
    label: string;
}

export default function Toogle(props: Props) {
    let state: boolean = props.value;

    const handleChange = () => {
        state = !state;
        props.onChangeHandler(state);
    };

    return (
        <div>
            <input
                className='hidden peer'
                type='checkbox'
                role='switch'
                onChange={handleChange}
                id='flexSwitchCheckDefault'
            />

            <label
                className="block w-16 h-8 rounded-full border-4 border-element-primary hover:cursor-pointer transition ease-out duration-4 after:content-[''] after:block after:relative after:top-[-0.5px] after:left-[0px] after:w-[25px] after:h-[25px] after:bg-[url('/moon.svg')] after:rounded-full after:transition after:ease-out after:duration-4 after:peer-checked:bg-[url('/sun.svg')] after:peer-checked:translate-x-8"
                htmlFor='flexSwitchCheckDefault'>
                {' '}
            </label>
        </div>
    );
}
