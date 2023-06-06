import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import "../App.css";
import NavBar from "./NavBar";
import Gardeners from "./Gardeners";
import Gardener from "./Gardener";
import Gardens from "./Gardens";
import Plants from "./Plants";

function App() {
    const [gardeners, setGardeners] = useState([]);
    const [gardens, setGardens] = useState([]);
    const [plants, setPlants] = useState([]);

    const server = "http://localhost:9292";

    useEffect(() => {
        fetch(`${server}/gardeners`)
            .then((r) => r.json())
            .then((data) => setGardeners(data));
        fetch(`${server}/gardens`)
            .then((r) => r.json())
            .then((data) => setGardens(data));
        fetch(`${server}/plants`)
            .then((r) => r.json())
            .then((data) => setPlants(data));
    }, []);

    function handleAddGardener(gardener) {
        setGardeners([...gardeners, gardener]);
    }

    return (
        <div className="App">
            <NavBar />
            <br />
            Garden Planner
            <Switch>
                <Route exact path="/gardeners">
                    <Gardeners
                        gardeners={gardeners}
                        addGardener={handleAddGardener}
                    />
                </Route>
                <Route path="/gardens">
                    <Gardens gardens={gardens} />
                </Route>
                <Route path="/plants">
                    <Plants plants={plants} />
                </Route>
                <Route path="/gardeners/:gardenerId">
                    <Gardener server={server} />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
