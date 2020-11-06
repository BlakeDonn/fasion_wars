import './App.css';
import {Homepage} from '../Homepage/Homepage';
import React, {useState} from 'react';

export const App = () => {
  const [selections, setSelections] = useState({armor: false, weapons: false, dyes: false});
  const updateSelections = (e) => {
    let selectionsToUpdate = selections
    selections[e.target.name] = !selections[e.target.name]
    setSelections(selectionsToUpdate)
  }
  return (
    <div className="App">
      <header className="">
        <Homepage updateSelections={updateSelections} />
      </header>
    </div>
  );
}


