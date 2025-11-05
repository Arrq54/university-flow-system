import React from "react";
import "./style.css";
interface IProps {
    children: React.ReactNode;
}
export default function PageContent({ children }: IProps) {
    return <div className="page-content">{children}</div>;
}
