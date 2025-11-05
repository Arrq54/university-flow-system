import { useNavigate } from "react-router-dom";
import "./style.css";

import React from "react";
interface IProps {
    icon: string;
    label: string;
    active?: boolean;
    url: string;
}
export default function SideNavigationItem({ icon, label, active, url }: IProps) {
    const navigate = useNavigate();
    return (
        <div
            className={`side-navigation-item ${active ? "active" : ""}`}
            onClick={() => {
                navigate(url);
            }}
        >
            <img src={icon} alt="icon" className="icon" />
            <span className="side-navigation-item-label">{label}</span>
        </div>
    );
}
