import React, { useState } from "react";
import { Card, Icon } from "semantic-ui-react";

function Gardeners({ gardeners }) {
    const [formData, setFormData] = useState(null);

    const gardenersToDisplay = gardeners.map((gardener) => {
        return (
            <Card key={gardener.id}>
                <Card.Content header={gardener.name} />
                <Card.Content extra>
                    <Icon name="lemon" />
                    {gardener.gardens.length}{" "}
                    {gardener.gardens.length == 1 ? "Garden" : "Gardens"}
                </Card.Content>
            </Card>
        );
    });

    return <Card.Group centered>{gardenersToDisplay}</Card.Group>;
}

export default Gardeners;
