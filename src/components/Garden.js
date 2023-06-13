import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "semantic-ui-react";

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

function convertDate(date) {
    return `${date.slice(5, 7)}/${date.slice(8, 10)}/${date.slice(0, 4)}`;
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
        return (
            <Table.Row key={plant.id}>
                <Table.Cell>{plant.name}</Table.Cell>
                <Table.Cell>{capitalize(plant.variety)}</Table.Cell>
                <Table.Cell>{convertDate(plant.created_at)}</Table.Cell>
                <Table.Cell>
                    <Button>Update Plant</Button>
                    <Button>Delete Plant</Button>
                </Table.Cell>
            </Table.Row>
        );
    });

    return (
        <div>
            <h2>{garden.name}</h2>
            <p>{"Gardener: " + garden.gardener.name}</p>
            <p>{"Location: " + capitalize(garden.indoor_outdoor) + "s"}</p>
            <p>{"Sunlight: " + capitalize(garden.sunlight)}</p>
            <p>{"Rain: " + capitalize(garden.rain)}</p>
            <Table celled structured>
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
        </div>
    );
}

export default Garden;
