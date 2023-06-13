import React from "react";

import { Table, Button } from "semantic-ui-react";

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

function convertDate(date) {
    return `${date.slice(5, 7)}/${date.slice(8, 10)}/${date.slice(0, 4)}`;
}

function Plant({ plant }) {
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
}

export default Plant;
