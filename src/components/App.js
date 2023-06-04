import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import "../App.css";
import NavBar from "./NavBar";
import Gardeners from "./Gardeners";
import Gardens from "./Gardens";
import Plants from "./Plants";

function App() {
    const [gardeners, setGardeners] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9292/gardeners")
            .then((r) => r.json())
            .then((data) => setGardeners(data));
    }, []);
    return (
        <div className="App">
            <NavBar />
            <br />
            Garden Planner
            <Switch>
                <Route path="/gardeners">
                    <Gardeners gardeners={gardeners} />
                </Route>
                <Route path="/gardens">
                    <Gardens />
                </Route>
                <Route path="/plants">
                    <Plants />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
