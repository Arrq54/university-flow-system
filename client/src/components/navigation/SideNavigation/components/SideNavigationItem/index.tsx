import "./style.css";

import React from "react";
interface IProps {
    icon: string;
    label: string;
    active?: boolean;
}
export default function SideNavigationItem({ icon, label, active }: IProps) {
    return (
        <div className={`side-navigation-item ${active ? "active" : ""}`}>
            <img src={icon} alt="icon" className="icon" />
            <span className="side-navigation-item-label">{label}</span>
        </div>
    );
}
