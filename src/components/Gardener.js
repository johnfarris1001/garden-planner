import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Card, Button, Form } from "semantic-ui-react";

import Gardens from "./Gardens";

function Gardener({ server, deleteGardener, editGardener }) {
    const params = useParams();
    const history = useHistory();

    const [gardener, setGardener] = useState({});
    const [gardens, setGardens] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showNewForm, setShowNewForm] = useState(false);
    const [newName, setNewName] = useState("");

    useEffect(() => {
        fetch(`${server}/gardeners/${params.gardenerId}`)
            .then((r) => r.json())
            .then((data) => {
                setGardener(data);
                setGardens(data.gardens);
            });
    }, []);

    function handleDelete() {
        fetch(`${server}/gardeners/${params.gardenerId}`, {
            method: "DELETE",
        })
            .then((r) => r.json())
            .then(() => {
                deleteGardener(gardener);
                history.push("/gardeners");
            });
    }

    function handleEdit(e) {
        e.preventDefault();
        if (!newName) return;
        fetch(`${server}/gardeners/${params.gardenerId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newName,
            }),
        })
            .then((r) => r.json())
            .then((data) => {
                setGardener(data);
                setNewName("");
                setShowEditForm(false);
                editGardener(data);
            });
    }

    const formDisplay = showEditForm
        ? { padding: "10px", width: "30%", margin: "auto" }
        : { display: "none" };

    return (
        <div>
            <h2>{gardener.name}</h2>
            <Button onClick={() => setShowEditForm(!showEditForm)}>
                {showEditForm ? "Cancel Edit" : "Edit Gardener Name"}
            </Button>
            <Button onClick={handleDelete}>Delete Gardener</Button>
            <Form style={formDisplay} onSubmit={handleEdit}>
                <Form.Field>
                    <label>Name: </label>
                    <input
                        placeholder="Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </Form.Field>
                <Button>Submit</Button>
            </Form>
            <Card.Group centered style={{ padding: "20px" }}>
                <Gardens gardens={gardens} />
            </Card.Group>
            <Button onClick={() => setShowNewForm(!showNewForm)}>
                {showNewForm ? "Cancel New Garden" : "Start New Garden"}
            </Button>
        </div>
    );
}

export default Gardener;
