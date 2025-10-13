import { useEffect, useState } from "react";
import SelectConsonant, { SelectConsonantForm } from "./SelectConsonant";
import SelectVowel, { SelectVowelForm } from "./SelectVowel";
import PhraseDisplay from "./PhraseDisplay";
import GuessThePhrase from "./GuessThePhrase";
import Wheel from "./Wheel";

type GameState = 'wheel' | 'selection' | 'guess';

export function Game() {
    // TODO: Move states in one single object?
    const [selectedConsonants, setSelectedConsonants] = useState<string[]>([]);
    const [selectedVowels, setSelectedVowels] = useState<string[]>([]);
    const [gameIsWon, setGameIsWon] = useState(false);
    const [phrase, setPhrase] = useState("");
    const [quoteAuthor, setQuoteAuthor] = useState("");
    const [gameIsStarted, setGameIsStarted] = useState(false);
    const [playerPoints, setPlayerPoints] = useState(0);
    const [gameState, setGameState] = useState<GameState>('wheel');
    const vowerlCosts = 250;

    const onVowelSelect = (formData: SelectVowelForm) => {
        if (playerPoints - vowerlCosts < 0) {
            alert('Not enough points to buy a vowel!');
            return;
        }
        setPlayerPoints(playerPoints - vowerlCosts);
        setSelectedVowels([...selectedVowels, formData.vowel]);
        setGameState('guess');
    }
    const onConsonantSelect = (formData: SelectConsonantForm) => {
        setSelectedConsonants([...selectedConsonants, formData.consonant]);
        setGameState('guess');
    }
    const onWheelTransitionEnd = (points) => {
        if (!points) setPlayerPoints(0);
        setPlayerPoints(playerPoints + points);
        setGameState('selection');
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

                    <Wheel onTransitionEnd={onWheelTransitionEnd} disabled={gameState === 'selection'} />

                    <PhraseDisplay phrase={phrase} selectedLetters={[...selectedConsonants, ...selectedVowels]} key={`phrase_${phrase.replaceAll(' ', '').toLocaleLowerCase()}`} />
                    <i>By {quoteAuthor}</i>

                    <div>Points: {playerPoints}</div>

                    <SelectConsonant disabled={gameIsWon || gameState != 'selection'} letters={selectedConsonants} onSelect={onConsonantSelect} key={`consontats_${selectedConsonants.join('')}`} />
                    <SelectVowel disabled={gameIsWon || gameState != 'guess' || playerPoints < vowerlCosts} letters={selectedVowels} onSelect={onVowelSelect} key={`vowels_${selectedVowels.join('')}`} />

                    <GuessThePhrase disabled={gameState != 'guess'} phrase={phrase} selectedLetters={[...selectedConsonants, ...selectedVowels]} onWin={() => setGameIsWon(true)} key={`guess_phrase_${phrase.replaceAll(' ', '').toLocaleLowerCase()}`} />
                </div>
            }
        </>
    );
}
