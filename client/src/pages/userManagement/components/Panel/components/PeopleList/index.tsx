import { type User } from "../../../../../../hooks/useUsersList";
import PeopleListItem from "./components/PeopleListItem";
import { useManageUser } from "../../hooks/useManageUser";

interface IProps {
    people: User[];
    reloadPeople: () => void;
    editOnClick: (user: any) => void;
}

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
