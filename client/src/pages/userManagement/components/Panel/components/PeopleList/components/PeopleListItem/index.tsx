import React from "react";
import type { User } from "../../../../../../../../hooks/useUsersList";
import "./style.css";
import { Button, IconButton } from "@mui/material";

interface IProps {
    person: User;
    handleDelete: (person: User) => void;
    editOnClick: (user: User) => void;
}
export default function PeopleListItem({ person, handleDelete, editOnClick }: IProps) {
    return (
        <div className="container">
            <img src="id-card-line.svg" className="icon" />
            <div className="items">
                <div className="info">
                    {person.title} {person.name} ({person.email})
                </div>
                <div className="user-controls">
                    <IconButton color="primary" aria-label="" onClick={() => handleDelete(person)}>
                        <img src="delete-bin-line.svg" alt="Show Password" style={{ width: 20, height: 20 }} />
                    </IconButton>
                    <IconButton color="primary" aria-label="" onClick={() => editOnClick(person)}>
                        <img src="pencil-line.svg" alt="Show Password" style={{ width: 20, height: 20 }} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
