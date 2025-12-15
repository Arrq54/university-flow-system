import React from "react";
import "./style.css";

interface IProps {
    name: string;
    description: string;
    icon: string;
}
export default function RoleCard({ name, description, icon }: IProps) {
    return (
        <div className="homepage-roles-card">
            <img src={icon} alt={`${name} Role`} className="homepage-roles-card-image" />
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    );
}
