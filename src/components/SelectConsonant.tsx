import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

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
        <div>
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
                <button type='submit'>
                    Select
                </button>
            </form>
        </div>
    );
};

export default SelectConsonant;
