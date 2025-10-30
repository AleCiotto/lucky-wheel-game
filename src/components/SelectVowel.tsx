import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

type SelectVowelProps = {
    letters: string[];
    disabled?: boolean;
    onSelect: (formData: SelectVowelForm) => any;
};

export type SelectVowelForm = {
    vowel: string;
};

const SelectVowel: React.FC<SelectVowelProps> = ({
    letters,
    disabled,
    onSelect,
}) => {
    const methods = useForm<SelectVowelForm>({
        mode: 'onSubmit',
    });
    const { register, handleSubmit } = methods;
    const vowels = 'AEIOU'.split('');

    return (
        <div className='flex flex-col gap-4'>
            <h2>
                <FormattedMessage id="game.select_vowel_title" />
            </h2>
            <form onSubmit={handleSubmit(onSelect)}>
                <select id="vowel-select"
                    disabled={disabled}
                    {...register('vowel', { required: true })}
                >
                    <option value="">--Please choose a vowel--</option>
                    {vowels.map((letter) => (
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
                    <FormattedMessage id="game.select_vowel" />
                </button>
            </form>
        </div>
    );
};

export default SelectVowel;
