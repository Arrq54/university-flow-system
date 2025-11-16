import "./style.css";
import type { User } from "../../../../../hooks/useUsersList";
import { Button, IconButton } from "@mui/material";
import "../shared.css";
interface IProps {
    assignedStudents: User[];
    onRemoveStudent?: (studentId: string) => void;
    onAddStudent?: () => void;
}

export default function AssignedStudents({ assignedStudents, onRemoveStudent, onAddStudent }: IProps) {
    return (
        <div className="assigned-students-section">
            <div className="section-header">
                <h2>Assigned Students</h2>
                {assignedStudents.length !== 0 ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onAddStudent}
                        endIcon={
                            <img
                                src="/add-line.svg"
                                alt=""
                                style={{ width: 20, height: 20, filter: "var(--white-filter)" }}
                            />
                        }
                    >
                        Assign students{" "}
                    </Button>
                ) : null}
            </div>

            {assignedStudents.length === 0 ? (
                <div className="empty-state">
                    <p>No students assigned to this course yet.</p>
                    {onAddStudent && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onAddStudent}
                            endIcon={
                                <img
                                    src="/add-line.svg"
                                    alt=""
                                    style={{ width: 20, height: 20, filter: "var(--white-filter)" }}
                                />
                            }
                        >
                            Assign students{" "}
                        </Button>
                    )}
                </div>
            ) : (
                <div className="students-grid">
                    {assignedStudents.map((student) => (
                        <div key={student._id} className="student-card">
                            <div className="student-info">
                                <div className="student-details">
                                    <h3>{student.name}</h3>
                                    <p className="student-email">{student.email}</p>
                                </div>
                            </div>
                            {onRemoveStudent && (
                                <div className="remove-button-container">
                                    <IconButton aria-label="" onClick={() => {}} className="remove-button">
                                        <img
                                            src="/delete-bin-line.svg"
                                            alt="Show Password"
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
