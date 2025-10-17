import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import Wheel from '../components/Wheel'
import { useState } from 'react';
import { Game } from '../components/Game';
import { FormattedMessage } from 'react-intl';

interface HomePageProps { }

function HomePage() {

  return (
    <div className='mt-10'>
      <h1 className='text-center text-2xl dark:bg-gray-600'>
        <FontAwesomeIcon icon={faDoorOpen} /> <FormattedMessage id="home.h1" />
      </h1>
      <Game />
    </div>
  )
}

export default HomePage
