import React from "react";
import { Card, Icon } from "semantic-ui-react";

function Gardeners({ gardeners }) {
    const gardenersToDisplay = gardeners.map((gardener) => {
        return (
            <Card key={gardener.id}>
                <Card.Content header={gardener.name} />
                <Card.Content extra>
                    <Icon name="lemon" />
                    {gardener.gardens.length} Gardens
                </Card.Content>
            </Card>
        );
    });

    return <div>{gardenersToDisplay}</div>;
}

export default Gardeners;
