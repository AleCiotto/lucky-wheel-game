import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import Wheel from '../components/Wheel'
import { useState } from 'react';
import { Game } from '../components/Game';

interface HomePageProps { }

function HomePage() {

  return (
    <div className='mt-10'>
      <h1 className='text-center text-2xl'>
        <FontAwesomeIcon icon={faDoorOpen} /> Guess the Phrase!
      </h1>
      <Game />
    </div>
  )
}

export default HomePage
