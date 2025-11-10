import React from "react";
import { useUsersList, type User } from "../../../../../../hooks/useUsersList";
import PeopleListItem from "./components/PeopleListItem";
import { useManageUser } from "../../hooks/useManageUser";
import { useGetToken } from "../../../../../../hooks/useGetToken";

interface IProps {
    people: User[];
    reloadPeople: () => void;
    editOnClick: (user: any) => void;
}

// To DO
// - implement pagination or infinite scroll for large user lists
// user profile popup on click
export default function PeopleList({ people, reloadPeople, editOnClick }: IProps) {
    const { remove } = useManageUser();
    const handleDelete = async (person: User) => {
        await remove(person._id);
        reloadPeople();
    };
    return (
        <div style={{ width: "100%" }}>
            {people.map((person) => (
                <PeopleListItem
                    key={person._id}
                    person={person}
                    handleDelete={() => handleDelete(person)}
                    editOnClick={editOnClick}
                />
            ))}
        </div>
    );
}
