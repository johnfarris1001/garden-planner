import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import "../App.css";
import NavBar from "./NavBar";
import Gardeners from "./Gardeners";
import Gardener from "./Gardener";
import Gardens from "./Gardens";
import Garden from "./Garden";
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

    function handleDeleteGardener(gardener) {
        const newGardeners = gardeners.filter((item) => {
            return gardener.id != item.id;
        });
        setGardeners(newGardeners);
    }

    function handleEditGardener(gardener) {
        const newGardeners = gardeners.filter((item) => {
            return gardener.id != item.id;
        });
        setGardeners([...newGardeners, gardener]);
    }

    return (
        <div className="App">
            <NavBar />
            <br />
            <h1 style={{ color: "#097969" }}>Garden Planner</h1>
            <Switch>
                <Route exact path="/gardeners">
                    <Gardeners
                        gardeners={gardeners}
                        addGardener={handleAddGardener}
                        server={server}
                    />
                </Route>
                <Route exact path="/gardens">
                    <Gardens gardens={gardens} />
                </Route>
                <Route path="/gardens/:gardenId">
                    <Garden server={server} />
                </Route>
                <Route path="/plants">
                    <Plants plants={plants} />
                </Route>
                <Route path="/gardeners/:gardenerId">
                    <Gardener
                        server={server}
                        deleteGardener={handleDeleteGardener}
                        editGardener={handleEditGardener}
                    />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
