import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "semantic-ui-react";

function Gardens({ gardens }) {
    function capitalize(s) {
        return s && s[0].toUpperCase() + s.slice(1);
    }

    const history = useHistory();

    const gardensToDisplay = gardens.map((garden) => {
        return (
            <Card
                onClick={() => history.push(`/gardens/${garden.id}`)}
                key={garden.id}
            >
                <Card.Header>{garden.name}</Card.Header>
                <Card.Content meta={"Gardener: " + garden.gardener.name} />
                <Card.Content extra>
                    Location: {capitalize(garden.indoor_outdoor)}
                    <br />
                    Sunlight: {capitalize(garden.sunlight)}
                    <br />
                    Rain: {capitalize(garden.rain)}
                </Card.Content>
                <Card.Content description={"Plants: " + garden.plants.length} />
            </Card>
        );
    });

    return (
        <Card.Group style={{ padding: "20px" }} centered>
            {gardens.length != 0 ? gardensToDisplay : "No Gardens Yet"}
        </Card.Group>
    );
}

export default Gardens;
