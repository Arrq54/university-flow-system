import React from "react";
import "./style.css";
interface IProps {
    title: string;
}
export default function PageHeader({ title }: IProps) {
    return <div className="page-header">{title}</div>;
}
