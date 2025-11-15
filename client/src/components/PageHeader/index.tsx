import React from "react";
import "./style.css";
interface IProps {
    title: string;
    button?: React.ReactElement;
    goBack?: () => void;
}
export default function PageHeader({ title, button, goBack }: IProps) {
    return (
        <div className="page-header">
            {goBack && (
                <img src="/arrow-left-long-fill.svg" alt="Go Back" className="page-header-go-back" onClick={goBack} />
            )}
            <span className="page-header-title">{title}</span>
            {button && <div className="page-header-button">{button}</div>}
        </div>
    );
}
