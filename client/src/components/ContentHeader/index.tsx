import "./style.css";
interface IProps {
    size: "small" | "medium" | "large" | "xLarge";
    title: string;
    align?: "left" | "center" | "right";
}
export default function ContentHeader({ size, title, align }: IProps) {
    return <div className={`content-header ${size} ${align}`}>{title}</div>;
}
