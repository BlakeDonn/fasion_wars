import "./App.css";
import {Homepage} from "../Homepage/Homepage";
import {Results} from "../Results/Results";
import React, {useState} from "react";
import {Route} from "react-router-dom";

export const App = () => {
  const [selections, setSelections] = useState({
    armor: false,
    weapons: false,
    dyes: false,
  });
  const updateSelections = (e) => {
    let selectionsToUpdate = selections;
    selectionsToUpdate[e.target.name] = !selectionsToUpdate[e.target.name];
    setSelections(selectionsToUpdate);
  };
  console.log(process.env.REACT_APP_API_KEY)
  return (
    <div className="App">
      <header className="">
        <Route exact path="/">
          <Homepage updateSelections={updateSelections} />
        </Route>
        <Route exact path="/results">
          <Results />
        </Route>
      </header>
    </div>
  );
};
