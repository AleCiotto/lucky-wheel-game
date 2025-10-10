function PhraseDisplay({ phrase, selectedLetters }: { phrase: string; selectedLetters: string[] }) {

    const display = phrase.split('').map((char, index) => {
        if (char === ' ') {
            return <span key={index} style={{ margin: '0 5px' }}>&nbsp;</span>;
        } else if (selectedLetters.includes(char)) {
            return <span key={index} style={{ margin: '0 2px', fontWeight: 'bold' }}>{char}</span>;
        } else {
            return <span key={index} style={{ margin: '0 2px' }}>_</span>;
        }
    });

    return (
        <div style={{ fontSize: '24px', margin: '20px 0' }}>
            {display}
        </div>
    );
}

export default PhraseDisplay;
