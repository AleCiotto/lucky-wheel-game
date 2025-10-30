import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Form } from 'react-router-dom';

type SelectConsonantProps = {
    letters: string[];
    disabled?: boolean;
    onSelect: (formData: SelectConsonantForm) => any;
};

export type SelectConsonantForm = {
    consonant: string;
};

const SelectConsonant: React.FC<SelectConsonantProps> = ({
    letters,
    disabled,
    onSelect,
}) => {
    const methods = useForm<SelectConsonantForm>({
        mode: 'onSubmit',
    });
    const { register, handleSubmit } = methods;
    const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'.split('');

    return (
        <div className='flex flex-col gap-4'>
            <h2>
                <FormattedMessage id="game.select_consonant_title" />
            </h2>
            <form onSubmit={handleSubmit(onSelect)}>
                <select id="consonant-select"
                    disabled={disabled}
                    {...register('consonant', { required: true })}
                >
                    <option value="">--Please choose a consonant--</option>
                    {consonants.map((letter) => (
                        <option
                            key={letter}
                            value={letter}
                            disabled={letters.includes(letter)}
                        >
                            {letter}
                        </option>
                    ))}
                </select>
                <button
                    disabled={disabled}
                    className='button'
                    type='submit'
                >
                    <FormattedMessage id="game.select_consonant" />
                </button>
            </form>
        </div>
    );
};

export default SelectConsonant;
