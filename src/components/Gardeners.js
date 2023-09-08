import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, Form } from "semantic-ui-react";

function Gardeners({ gardeners, addGardener, server }) {
    const [showForm, setShowForm] = useState(false);
    const [newName, setNewName] = useState("");

    const history = useHistory();

    function handleClick() {
        setShowForm(!showForm);
    }

    const display = showForm
        ? { width: "50%", margin: "auto", padding: "10px", border: "solid" }
        : { display: "none" };
    const buttonText = showForm ? "Hide Form" : "Add New Gardener";

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!newName) return;
        fetch(`${server}/gardeners`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newName,
            }),
        })
            .then((r) => r.json())
            .then((data) => addGardener(data));

        setNewName("");
        setShowForm(!showForm);
    }

    const gardenersToDisplay = gardeners.map((gardener) => {
        return (
            <Card
                onClick={() => history.push(`/gardeners/${gardener.id}`)}
                key={gardener.id}
            >
                <Card.Content header={gardener.name} />
                <Card.Content extra>
                    {gardener.gardens
                        ? `🌱 ${gardener.gardens.length} ${
                              gardener.gardens.length == 1
                                  ? "Garden"
                                  : "Gardens"
                          }`
                        : "New Gardener"}
                </Card.Content>
            </Card>
        );
    });

    return (
        <div>
            <div>
                <Button
                    style={{ margin: "10px", color: "#097969" }}
                    onClick={handleClick}
                >
                    {buttonText}
                </Button>
                <Form style={display} onSubmit={handleSubmit}>
                    <Form.Group widths="equal">
                        <Form.Input
                            fluid
                            placeholder="Name"
                            value={newName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Button>Submit</Form.Button>
                </Form>
            </div>
            <br />
            <Card.Group centered>{gardenersToDisplay}</Card.Group>
        </div>
    );
}

export default Gardeners;
