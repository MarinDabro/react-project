
import { useContext } from 'react';

import StartContext from './contexts/StartContext';
import Settings from './components/settings';
import Tournament from './components/tournament';

export default function Home() {
  const [settingsDone] = useContext(StartContext)

  if (!settingsDone) {
    return <Settings />
  } else {
    return <Tournament />
  }
}
