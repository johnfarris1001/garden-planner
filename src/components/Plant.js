import React, { useState } from "react";

import { Table, Button } from "semantic-ui-react";

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

function convertDate(date) {
    return `${date.slice(5, 7)}/${date.slice(8, 10)}/${date.slice(0, 4)}`;
}

function Plant({ plant, server, removePlant }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [updateInfo, setUpdateInfo] = useState({
        name: plant.name,
        variety: capitalize(plant.variety),
        planted: convertDate(plant.created_at),
    });

    function handleDelete() {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }
        fetch(`${server}/plants/${plant.id}`, {
            method: "DELETE",
        })
            .then((r) => r.json())
            .then(() => removePlant(plant));
    }

    return (
        <Table.Row key={plant.id}>
            <Table.Cell>{plant.name}</Table.Cell>
            <Table.Cell>{capitalize(plant.variety)}</Table.Cell>
            <Table.Cell>{convertDate(plant.created_at)}</Table.Cell>
            <Table.Cell>
                <Button onClick={() => setShowUpdate(!showUpdate)}>
                    {showUpdate ? "Submit" : "Update Plant"}
                </Button>
                <Button onClick={handleDelete}>
                    {confirmDelete ? "Are You Sure?" : "Delete Plant"}
                </Button>
            </Table.Cell>
        </Table.Row>
    );
}

export default Plant;
