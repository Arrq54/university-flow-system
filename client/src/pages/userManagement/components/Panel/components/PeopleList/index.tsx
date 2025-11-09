import React from "react";
import type { User } from "../../../../../../hooks/useUsersList";
import PeopleListItem from "./components/PeopleListItem";

interface IProps {
    people: User[];
}
export default function PeopleList({ people }: IProps) {
    return (
        <div style={{ width: "100%" }}>
            {people.map((person) => (
                <PeopleListItem key={person.id} person={person} />
            ))}
        </div>
    );
}
