import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Divider } from "semantic-ui-react";

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

    let newGardens = [];
    let newPlants = [];

    const server = "http://localhost:9292";

    useEffect(() => {
        fetch(`${server}/gardeners`)
            .then((r) => r.json())
            .then((data) => {
                setGardeners(data);
                data.forEach((gardener) => {
                    newGardens = [...newGardens, ...gardener.gardens];
                });
                setGardens(newGardens);
                newGardens.forEach((garden) => {
                    newPlants = [...newPlants, ...garden.plants];
                });
                setPlants(newPlants);
            });
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
                <Route exact path="/">
                    <Divider />
                    <h3>Gardeners</h3>
                    <Gardeners
                        gardeners={gardeners}
                        addGardener={handleAddGardener}
                        server={server}
                    />
                    <Divider />
                    <h3>Gardens</h3>
                    <Gardens gardens={gardens} />
                    <Divider />
                    <h3>Plants</h3>
                    <Plants plants={plants} server={server} />
                </Route>
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
                    <Plants plants={plants} server={server} />
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
