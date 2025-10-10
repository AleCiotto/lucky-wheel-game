import { useEffect, useState } from "react";
import SelectConsonant, { SelectConsonantForm } from "./SelectConsonant";
import SelectVowel, { SelectVowelForm } from "./SelectVowel";
import PhraseDisplay from "./PhraseDisplay";
import GuessThePhrase from "./GuessThePhrase";
import Wheel from "./Wheel";

export function Game() {
    // TODO: Move states in one single object?
    const [selectedConsonants, setSelectedConsonants] = useState<string[]>([]);
    const [selectedVowels, setSelectedVowels] = useState<string[]>([]);
    const [gameIsWon, setGameIsWon] = useState(false);
    const [phrase, setPhrase] = useState("");
    const [quoteAuthor, setQuoteAuthor] = useState("");
    const [gameIsStarted, setGameIsStarted] = useState(false);
    const [playerPoints, setPlayerPoints] = useState(0);

    const onVowelSelect = (formData: SelectVowelForm) => {
        if (playerPoints - 500 < 0) {
            alert('Not enough points to buy a vowel!');
            return;
        }
        setPlayerPoints(playerPoints - 500);
        setSelectedVowels([...selectedVowels, formData.vowel]);
    }
    const onConsonantSelect = (formData: SelectConsonantForm) => {
        setSelectedConsonants([...selectedConsonants, formData.consonant]);
    }
    const onWheelTransitionEnd = (points) => {
        if (!points) setPlayerPoints(0);
        setPlayerPoints(playerPoints + points);
    }

    useEffect(() => {
        if (!gameIsStarted || !phrase) return;
        setGameIsWon(phrase.split('').every(c => c === ' ' || [...selectedConsonants, ...selectedVowels].includes(c)));
    }, [selectedVowels, selectedConsonants]);

    useEffect(() => {
        async function fetchPhrase() {
            const quote = { quote: '', author: '' };
            // const response = await fetch('https://api.api-ninjas.com/v1/quotes', { headers: { 'X-Api-Key': '_____________' } });
            // const data = await response.json();
            // const quote = data[0];

            // if (response.status !== 200) {
            //     console.error('Error fetching phrase:', data);
            //     return;
            // }

            // if (!quote || !quote.quote) {
            //     console.error('Invalid quote data:', quote);
            //     return;
            // }

            setPhrase(quote?.quote?.toUpperCase() || "HELLO WORLD");
            setQuoteAuthor(quote?.author || "Unknown");
        }
        gameIsStarted && fetchPhrase();
    }, [gameIsStarted])

    return (
        <>
            <h2>Guess the Phrase!</h2>

            {!gameIsStarted &&
                <button onClick={() => setGameIsStarted(true)}>Start Game</button>
            }

            {gameIsStarted &&
                <div className="Game">
                    {
                        gameIsWon && <div>Congratulations! You've won!</div>
                    }

                    <Wheel onTransitionEnd={onWheelTransitionEnd} />

                    <PhraseDisplay phrase={phrase} selectedLetters={[...selectedConsonants, ...selectedVowels]} key={`phrase_${phrase.replaceAll(' ', '').toLocaleLowerCase()}`} />
                    <i>By {quoteAuthor}</i>

                    <div>Points: {playerPoints}</div>

                    <SelectConsonant disabled={gameIsWon} letters={selectedConsonants} onSelect={onConsonantSelect} key={`consontats_${selectedConsonants.join('')}`} />
                    <SelectVowel disabled={gameIsWon} letters={selectedVowels} onSelect={onVowelSelect} key={`vowels_${selectedVowels.join('')}`} />

                    <GuessThePhrase phrase={phrase} selectedLetters={[...selectedConsonants, ...selectedVowels]} onWin={() => setGameIsWon(true)} key={`guess_phrase_${phrase.replaceAll(' ', '').toLocaleLowerCase()}`} />
                </div>
            }
        </>
    );
}
