import "./style.css";
import type { User } from "../../../../../hooks/useUsersList";
import { Button, IconButton } from "@mui/material";
import "../shared.css";

interface IProps {
    assignedTeachers: User[];
    onRemoveTeacher?: (teacherId: string) => void;
    onAddTeacher?: () => void;
}

export default function AssignedTeachers({ assignedTeachers, onRemoveTeacher, onAddTeacher }: IProps) {
    return (
        <div className="assigned-teachers-section">
            <div className="section-header">
                <h2>Assigned Teachers</h2>
                {assignedTeachers.length !== 0 ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onAddTeacher}
                        endIcon={
                            <img
                                src="/add-line.svg"
                                alt=""
                                style={{ width: 20, height: 20, filter: "var(--white-filter)" }}
                            />
                        }
                    >
                        Assign teachers
                    </Button>
                ) : null}
            </div>

            {assignedTeachers.length === 0 ? (
                <div className="empty-state">
                    <p>No teachers assigned to this course yet.</p>
                    {onAddTeacher && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onAddTeacher}
                            endIcon={
                                <img
                                    src="/add-line.svg"
                                    alt=""
                                    style={{ width: 20, height: 20, filter: "var(--white-filter)" }}
                                />
                            }
                        >
                            Assign teachers
                        </Button>
                    )}
                </div>
            ) : (
                <div className="teachers-grid">
                    {assignedTeachers.map((teacher) => (
                        <div key={teacher._id} className="teacher-card">
                            <div className="teacher-info">
                                <div className="teacher-details">
                                    <h3>{teacher.title ? `${teacher.title} ${teacher.name}` : teacher.name}</h3>
                                    <p className="teacher-email">{teacher.email}</p>
                                </div>
                            </div>
                            {onRemoveTeacher && (
                                <div className="remove-button-container">
                                    <IconButton
                                        aria-label=""
                                        onClick={() => onRemoveTeacher(teacher._id)}
                                        className="remove-button"
                                    >
                                        <img
                                            src="/delete-bin-line.svg"
                                            alt="Remove Teacher"
                                            style={{ width: 20, height: 20 }}
                                        />
                                    </IconButton>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
