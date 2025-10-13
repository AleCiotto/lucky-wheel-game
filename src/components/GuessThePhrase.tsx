import { useRef } from "react";
import { useForm } from "react-hook-form";

type GuessThePhraseProps = {
    disabled?: boolean,
    phrase: string;
    onWin: () => void;
    selectedLetters: string[];
}

type GuessThePhraseForm = {
    guesses: string[];
};

function GuessThePhrase({ phrase, selectedLetters, onWin }: GuessThePhraseProps) {
    const chars = phrase.split('');
    const methods = useForm<GuessThePhraseForm>({
        defaultValues: { guesses: [] }
    });
    const { register, handleSubmit, setValue, reset, setFocus } = methods;
    const refArray = useRef<(HTMLInputElement | null)[]>([]);
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const input = event.target;
        const value = input.value;

        if (value.length >= 1) focusOnNextInput(index);
    };

    const focusOnNextInput = (index: number) => {
        let nextInputIndex = index + 1;

        do {
            const nextInput = refArray.current[nextInputIndex];
            if (nextInput && !nextInput.disabled && nextInput.nodeName.toUpperCase() === "INPUT") {
                setFocus(`guesses.${nextInputIndex}`);
                return;
            }
            nextInputIndex++;
        } while (nextInputIndex < refArray.current.length);
    }

    const onSubmit = (data: GuessThePhraseForm) => {
        const guessedPhrase = data.guesses.join('').toUpperCase();
        if (guessedPhrase === phrase.toUpperCase()) {
            onWin();
        } else {
            alert('Incorrect guess. Try again!');
        }
    }

    const display = chars.map((char, index) => {
        const { ref, ...rest } = register(`guesses.${index}`);

        if (char === ' ') {
            return <span key={index} style={{ margin: '0 5px' }}>&nbsp;<input {...rest} ref={ref} type="hidden" value=" " disabled /></span>;
        } else if (selectedLetters.includes(char)) {
            setValue(`guesses.${index}`, char, {});
            return <span key={index} style={{ margin: '0 2px', fontWeight: 'bold' }}>
                <input required {...rest} ref={(e) => { ref(e); refArray.current[index] = e }} type="text" onChange={e => onInputChange(e, index)} maxLength={1} style={{ width: '20px', textAlign: 'center', border: '1px solid black', textTransform: 'uppercase' }} disabled />
            </span>;
        } else {
            return <span key={index} style={{ margin: '0 2px' }}>
                <input required {...rest} ref={(e) => { ref(e); refArray.current[index] = e }} type="text" onChange={e => onInputChange(e, index)} maxLength={1} style={{ width: '20px', textAlign: 'center', border: '1px solid black', textTransform: 'uppercase' }} />
            </span>;
        }
    });

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div>{display}</div>
        <button type="submit">Submit Guess</button>
        <button onClick={() => reset()}>Reset</button>
    </form>;
}

export default GuessThePhrase;
