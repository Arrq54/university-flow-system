import React, { useEffect, useState } from "react";
import "./style.css";
import ContentHeader from "../../../../components/ContentHeader";
import SearchBar from "../../../../components/SearchBar";
import Controls from "./components/Controls";
import AddUserPopup from "./components/AddUserPopup";
import PeopleList from "./components/PeopleList";

interface IProps {
    type: "teachers" | "students";
    icon: string;
    people: any[];
    addOnClick: () => void;
}
export default function Panel({ type, icon, people, addOnClick }: IProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPeople, setFilteredPeople] = useState(people);

    useEffect(() => {
        setFilteredPeople(
            people.filter(
                (person) =>
                    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    person.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, people]);

    return (
        <div className="panel">
            <div className="header">
                <ContentHeader title={type === "teachers" ? "Teachers" : "Students"} size="medium" />
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
            <div className="content">
                {filteredPeople.length === 0 ? (
                    <div className="no-people">
                        <img src={icon} alt="" style={{ width: 60, height: 60, marginBottom: 20 }} />
                        <div className="no-people-text">No {type} found.</div>
                    </div>
                ) : (
                    <PeopleList people={filteredPeople} />
                )}
            </div>
            <div className="footer">
                <Controls addOnClick={addOnClick} />
            </div>
        </div>
    );
}
