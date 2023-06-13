import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, List, Button } from "semantic-ui-react";

import Plant from "./Plant";

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

function Garden({ server }) {
    const params = useParams();

    const [garden, setGarden] = useState({
        gardener: { name: "" },
        indoor_outdoor: "",
        sunlight: "",
        rain: "",
        plants: [],
    });

    useEffect(() => {
        fetch(`${server}/gardens/${params.gardenId}`)
            .then((r) => r.json())
            .then((data) => {
                console.log(data);
                setGarden(data);
            });
    }, []);

    const plants = garden.plants.map((plant) => {
        return <Plant plant={plant} />;
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
                <Button>Add New Plant!</Button>
                <Button>Update Garden Details</Button>
                <Button>Delete Garden</Button>
            </div>
        </div>
    );
}

export default Garden;
