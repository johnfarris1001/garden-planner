import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "semantic-ui-react";

function Gardener({ server }) {
    const params = useParams();

    const [gardener, setGardener] = useState({});
    const [gardens, setGardens] = useState([]);

    useEffect(() => {
        fetch(`${server}/gardeners/${params.gardenerId}`)
            .then((r) => r.json())
            .then((data) => {
                setGardener(data);
                setGardens(data.gardens);
            });
    }, []);

    const gardensToRender = gardens.map((garden) => {
        return (
            <Card key={garden.id}>
                <Card.Header>{garden.name}</Card.Header>
            </Card>
        );
    });

    return (
        <div>
            <h2>{gardener.name}</h2>
            <Card.Group centered>{gardensToRender}</Card.Group>
        </div>
    );
}

export default Gardener;
