import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Card, Button, Form } from "semantic-ui-react";

import Gardens from "./Gardens";

function Gardener({ server, deleteGardener, editGardener, addGarden }) {
    const params = useParams();
    const history = useHistory();

    const [gardener, setGardener] = useState({});
    const [gardens, setGardens] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showNewForm, setShowNewForm] = useState(false);
    const [newName, setNewName] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [newGardenFormData, setNewGardenFormData] = useState({
        gardenerId: gardener.id,
        name: "",
        location: "",
        sunlight: "",
        rain: "",
    });

    const blankFormData = {
        gardenerId: gardener.id,
        name: "",
        location: "",
        sunlight: "",
        rain: "",
    };

    useEffect(() => {
        fetch(`${server}/gardeners/${params.gardenerId}`)
            .then((r) => r.json())
            .then((data) => {
                setGardener(data);
                setGardens(data.gardens);
            });
    }, []);

    function handleDelete() {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }
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

    function handleNewGarden(e) {
        e.preventDefault();
        if (
            !newGardenFormData.name ||
            !newGardenFormData.location ||
            !newGardenFormData.sunlight ||
            !newGardenFormData.rain
        ) {
            return;
        }
        newGardenFormData.gardenerId = gardener.id;
        fetch(`${server}/gardens`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGardenFormData),
        })
            .then((r) => r.json())
            .then((data) =>
                addGarden({ ...data, gardener: gardener, plants: [] })
            );

        setNewGardenFormData(blankFormData);
        setShowNewForm(false);
    }

    function addGarden(garden) {
        setGardens([...gardens, garden]);
    }

    const editFormDisplay = showEditForm
        ? { padding: "10px", width: "30%", margin: "auto" }
        : { display: "none" };

    const newFormDisplay = showNewForm
        ? { padding: "10px", width: "30%", margin: "auto" }
        : { display: "none" };

    return (
        <div>
            <h2>{gardener.name}</h2>
            <Button onClick={() => setShowEditForm(!showEditForm)}>
                {showEditForm ? "Cancel Edit" : "Edit Gardener Name"}
            </Button>
            <Button onClick={handleDelete}>
                {confirmDelete ? "Are You Sure?" : "Delete Gardener"}
            </Button>
            <Form style={editFormDisplay} onSubmit={handleEdit}>
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
            <Form style={newFormDisplay} onSubmit={handleNewGarden}>
                <Form.Field>
                    <input
                        placeholder="Name"
                        value={newGardenFormData.name}
                        onChange={(e) =>
                            setNewGardenFormData({
                                ...newGardenFormData,
                                name: e.target.value,
                            })
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        placeholder="Location"
                        value={newGardenFormData.location}
                        onChange={(e) =>
                            setNewGardenFormData({
                                ...newGardenFormData,
                                location: e.target.value,
                            })
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        placeholder="Sunlight "
                        value={newGardenFormData.sunlight}
                        onChange={(e) =>
                            setNewGardenFormData({
                                ...newGardenFormData,
                                sunlight: e.target.value,
                            })
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <input
                        placeholder="Rain "
                        value={newGardenFormData.rain}
                        onChange={(e) =>
                            setNewGardenFormData({
                                ...newGardenFormData,
                                rain: e.target.value,
                            })
                        }
                    />
                </Form.Field>
                <Button>Submit</Button>
            </Form>
        </div>
    );
}

export default Gardener;
