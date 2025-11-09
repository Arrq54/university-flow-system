import React from "react";
import type { User } from "../../../../../../../../hooks/useUsersList";
import "./style.css";
interface IProps {
    person: User;
}
export default function PeopleListItem({ person }: IProps) {
    return (
        <div className="container">
            <img src="id-card-line.svg" className="icon" />
            <div className="info">
                {person.title} {person.name} ({person.email})
            </div>
            <div className="controls"></div>
        </div>
    );
}
