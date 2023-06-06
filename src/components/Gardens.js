import React from "react";
import { Card, Icon } from "semantic-ui-react";

function Gardens({ gardens }) {
    function capitalize(s) {
        return s && s[0].toUpperCase() + s.slice(1);
    }

    const gardensToDisplay = gardens.map((garden) => {
        return (
            <Card key={garden.id}>
                <Card.Content header={"Name: " + garden.name} />
                <Card.Content meta={"Gardener: " + garden.gardener.name} />
                <Card.Content extra>
                    Location: {capitalize(garden.indoor_outdoor)}
                    <br />
                    Sunlight: {capitalize(garden.sunlight)}
                    <br />
                    Rain: {capitalize(garden.rain)}
                </Card.Content>
            </Card>
        );
    });

    return <Card.Group centered>{gardensToDisplay}</Card.Group>;
}

export default Gardens;
