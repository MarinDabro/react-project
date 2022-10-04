import { useState } from 'react';
import StartContext from './StartContext';

function StartContextProvider({children}) {
  const [settingsDone, setSettingsDone] = useState(false);

  return (
      <StartContext.Provider value={[settingsDone, setSettingsDone]}>
          {children}
      </StartContext.Provider>
  )

}

export default StartContextProvider;
