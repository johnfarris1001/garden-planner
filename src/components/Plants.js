import React from "react";
import { Card, Icon } from "semantic-ui-react";

function Plants({ plants }) {
    const plantsToDisplay = plants.map((plant) => {
        return (
            <Card key={plant.id}>
                <Card.Content header={plant.name} />
                <Card.Content meta>Variety: {plant.variety}</Card.Content>
            </Card>
        );
    });

    return <Card.Group centered>{plantsToDisplay}</Card.Group>;
}

export default Plants;
