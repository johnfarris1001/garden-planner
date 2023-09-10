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

    const server = "http://localhost:9292";

    useEffect(() => {
        fetch(`${server}/gardeners`)
            .then((r) => r.json())
            .then((data) => {
                let newGardens = [];
                let newPlants = [];
                data.forEach((gardener) => {
                    newGardens = [...newGardens, ...gardener.gardens];
                });
                newGardens.forEach((garden) => {
                    newPlants = [...newPlants, ...garden.plants];
                });
                setGardeners(data);
                setGardens(newGardens);
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

    function handleRemoveGarden(id) {
        const updatedGardens = gardens.filter((item) => {
            return item.id !== id;
        });
        const updatedGardeners = gardeners.map((item) => {
            if (item.gardens.filter((e) => e.id === id).length === 0) {
                return item;
            } else {
                item.gardens.pop();
                return item;
            }
        });
        setGardens(updatedGardens);
        setGardeners(updatedGardeners);
    }

    function handleAddHomeGarden(garden) {
        const updatedGardeners = gardeners.map((item) => {
            if (item.id === garden.gardener_id) {
                const updatedItem = {
                    ...item,
                    gardens: [...item.gardens, garden],
                };
                return updatedItem;
            } else {
                return item;
            }
        });
        const updatedGardens = [...gardens, garden];
        setGardeners(updatedGardeners);
        setGardens(updatedGardens);
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
                    <Garden server={server} removeGarden={handleRemoveGarden} />
                </Route>
                <Route path="/plants">
                    <Plants plants={plants} server={server} />
                </Route>
                <Route path="/gardeners/:gardenerId">
                    <Gardener
                        server={server}
                        deleteGardener={handleDeleteGardener}
                        editGardener={handleEditGardener}
                        addHomeGarden={handleAddHomeGarden}
                    />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
