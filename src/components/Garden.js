import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, List, Button, Form } from "semantic-ui-react";

import Plant from "./Plant";

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

function Garden({ server }) {
    const params = useParams();

    const [showNewPlantForm, setShowNewPlantForm] = useState(false);
    const [showGardenForm, setShowGardenForm] = useState(false);
    const [garden, setGarden] = useState({
        gardener: { name: "" },
        indoor_outdoor: "",
        sunlight: "",
        rain: "",
        plants: [],
    });
    const [gardenForm, setGardenForm] = useState({
        name: "",
        location: garden.indoor_outdoor,
        sunlight: garden.sunlight,
        rain: garden.rain,
    });
    const [newPlantInfo, setNewPlantInfo] = useState({
        name: "",
        variety: "",
        gardenId: params.gardenId,
    });

    useEffect(() => {
        fetch(`${server}/gardens/${params.gardenId}`)
            .then((r) => r.json())
            .then((data) => {
                setGarden(data);
                setGardenForm({
                    ...gardenForm,
                    name: data.name,
                    location: capitalize(data.indoor_outdoor),
                    sunlight: capitalize(data.sunlight),
                    rain: capitalize(data.rain),
                });
            });
    }, []);

    function handleRemovePlant(plant) {
        const newPlants = garden.plants.filter((item) => {
            return plant.id != item.id;
        });
        setGarden({
            ...garden,
            plants: newPlants,
        });
    }

    function handleUpdatePlant(plant) {
        const newPlants = garden.plants.map((item) => {
            if (item.id == plant.id) {
                return plant;
            } else {
                return item;
            }
        });
        setGarden({
            ...garden,
            plants: newPlants,
        });
    }

    function handleNewPlant(e) {
        e.preventDefault();
        if (!newPlantInfo.name || !newPlantInfo.variety) {
            return;
        }
        fetch(`${server}/plants`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPlantInfo),
        })
            .then((r) => r.json())
            .then((data) => addPlant(data));
        setShowNewPlantForm(false);
    }

    function addPlant(plant) {
        const newPlants = [...garden.plants, plant];
        setGarden({
            ...garden,
            plants: newPlants,
        });
    }

    function handleUpdateGarden(e) {
        e.preventDefault();
        if (
            !gardenForm.name ||
            !gardenForm.location ||
            !gardenForm.sunlight ||
            !gardenForm.rain
        ) {
            return;
        }
        fetch(`${server}/gardens/${garden.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gardenForm),
        })
            .then((r) => r.json())
            .then((data) =>
                setGarden({
                    ...data,
                    plants: garden.plants,
                    gardener: { name: garden.gardener.name },
                })
            );
        setShowGardenForm(false);
    }

    const newPlantDisplay = showNewPlantForm
        ? { width: "50%", margin: "auto", padding: "10px", border: "solid" }
        : { display: "none" };

    const updatePlantDisplay = showGardenForm
        ? { width: "80%", margin: "auto", padding: "10px", border: "solid" }
        : { display: "none" };

    const plants = garden.plants.map((plant) => {
        return (
            <Plant
                key={plant.id}
                plant={plant}
                server={server}
                removePlant={handleRemovePlant}
                updatePlant={handleUpdatePlant}
            />
        );
    });

    return (
        <div>
            <h2>{garden.name}</h2>
            <List>
                <List.Item>{"Gardener: " + garden.gardener.name}</List.Item>
                <List.Item>
                    {"Location: " + capitalize(garden.indoor_outdoor) + "s"}
                </List.Item>
                <List.Item>
                    {"Sunlight: " + capitalize(garden.sunlight)}
                </List.Item>
                <List.Item>{"Rain: " + capitalize(garden.rain)}</List.Item>
            </List>
            <div style={{ padding: "20px" }}>
                <Button onClick={() => setShowGardenForm(!showGardenForm)}>
                    {showGardenForm ? "Cancel" : "Update Garden Details"}
                </Button>
                <Form style={updatePlantDisplay} onSubmit={handleUpdateGarden}>
                    <Form.Group>
                        <Form.Field>
                            <input
                                placeholder="Name"
                                value={gardenForm.name}
                                onChange={(e) => {
                                    setGardenForm({
                                        ...gardenForm,
                                        name: e.target.value,
                                    });
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <input
                                placeholder="Location"
                                value={gardenForm.location}
                                onChange={(e) => {
                                    setGardenForm({
                                        ...gardenForm,
                                        location: e.target.value,
                                    });
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <input
                                placeholder="Sunglight"
                                value={gardenForm.sunlight}
                                onChange={(e) => {
                                    setGardenForm({
                                        ...gardenForm,
                                        sunlight: e.target.value,
                                    });
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <input
                                placeholder="Rain"
                                value={gardenForm.rain}
                                onChange={(e) => {
                                    setGardenForm({
                                        ...gardenForm,
                                        rain: e.target.value,
                                    });
                                }}
                            />
                        </Form.Field>
                        <Button>Submit</Button>
                    </Form.Group>
                </Form>
            </div>
            <Table celled structured style={{ width: "80%", margin: "auto" }}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Variety</Table.HeaderCell>
                        <Table.HeaderCell>Date Planted</Table.HeaderCell>
                        <Table.HeaderCell>Update/Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{plants}</Table.Body>
            </Table>
            <div style={{ padding: "20px" }}>
                <Button onClick={() => setShowNewPlantForm(!showNewPlantForm)}>
                    {showNewPlantForm ? "Cancel" : "Add New Plant!"}
                </Button>
                <Button>Delete Garden</Button>
            </div>
            <Form style={newPlantDisplay} onSubmit={handleNewPlant}>
                <Form.Group>
                    <Form.Field>
                        <input
                            placeholder="Name"
                            value={newPlantInfo.name}
                            onChange={(e) =>
                                setNewPlantInfo({
                                    ...newPlantInfo,
                                    name: e.target.value,
                                })
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <input
                            placeholder="Variety"
                            value={newPlantInfo.variety}
                            onChange={(e) =>
                                setNewPlantInfo({
                                    ...newPlantInfo,
                                    variety: e.target.value,
                                })
                            }
                        />
                    </Form.Field>
                    <Button>Submit</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default Garden;
