import "./style.css";

import { useEffect, useState } from "react";

interface IProps {
    type:
        | "line"
        | "line-spacing"
        | "text-line-divider"
        | "text-divider"
        | "solid-text-divider"
        | "solid-text-divider-white"
        | "icon-button"
        | "icon-button-group";
    orientation: "horizontal" | "vertical";
    spacingBefore?: string;
    spacingAfter?: string;
    onToggle?: () => void;
}

const ContentDivider: React.FC<IProps> = ({ type, orientation, spacingBefore = "", spacingAfter = "" }) => {
    const margin =
        orientation === "horizontal" ? `${spacingBefore} 0 ${spacingAfter} 0` : `0 ${spacingAfter} 0 ${spacingBefore}`;

    if (type === "line" || type === "line-spacing") {
        return <div className={orientation} style={{ margin }} />;
    }

    return <div className={orientation} style={{ margin }} />;
};

export default ContentDivider;
