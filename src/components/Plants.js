import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "semantic-ui-react";

function Plants({ plants }) {
    const history = useHistory();

    const plantsToDisplay = plants.map((plant) => {
        return (
            <Card
                key={plant.id}
                onClick={() => history.push(`gardens/${plant.garden_id}`)}
            >
                <Card.Content header={plant.name} />
                <Card.Content meta={"Variety: " + plant.variety} />
            </Card>
        );
    });

    return <Card.Group centered>{plantsToDisplay}</Card.Group>;
}

export default Plants;
