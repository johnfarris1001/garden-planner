import React, { useState } from "react";

import { Table, Button, Input } from "semantic-ui-react";

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

function convertDate(date) {
    return `${date.slice(5, 7)}/${date.slice(8, 10)}/${date.slice(0, 4)}`;
}

function Plant({ plant, server, removePlant, updatePlant }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [updateInfo, setUpdateInfo] = useState({
        name: plant.name,
        variety: capitalize(plant.variety),
    });

    const inputStyle = showUpdate ? {} : { display: "none" };

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

    function handleUpdate() {
        if (!showUpdate) {
            setShowUpdate(true);
            return;
        }
        fetch(`${server}/plants/${plant.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: updateInfo.name,
                variety: updateInfo.variety,
            }),
        })
            .then((r) => r.json())
            .then((data) => updatePlant(data));
        setShowUpdate(false);
    }

    return (
        <Table.Row key={plant.id}>
            <Table.Cell>
                {showUpdate ? "" : plant.name}
                <Input
                    fluid
                    style={inputStyle}
                    value={updateInfo.name}
                    onChange={(e) =>
                        setUpdateInfo({ ...updateInfo, name: e.target.value })
                    }
                />
            </Table.Cell>
            <Table.Cell>
                {showUpdate ? "" : capitalize(plant.variety)}
                <Input
                    fluid
                    style={inputStyle}
                    value={updateInfo.variety}
                    onChange={(e) =>
                        setUpdateInfo({
                            ...updateInfo,
                            variety: e.target.value,
                        })
                    }
                />
            </Table.Cell>
            <Table.Cell>{convertDate(plant.created_at)}</Table.Cell>
            <Table.Cell>
                <Button onClick={handleUpdate}>
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
