import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function HomePage() {
    const navigate = useNavigate();
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

    const features = [
        { title: "Course Management", description: "Easily manage and access all your courses in one place" },
        { title: "Grade Tracking", description: "Real-time updates on your academic progress" },
        { title: "Messaging", description: "Direct communication between students and professors" },
        { title: "Calendar", description: "Synchronized scheduling for classes and deadlines" },
    ];

    const faqs = [
        {
            q: "How do I get access to the system?",
            a: "Contact your university's administration or email support@ufs.com to request an account.",
        },
        {
            q: "What can I do as a Student?",
            a: "Students can view courses, track grades, check their calendar, and communicate with professors.",
        },
        {
            q: "What are Professor capabilities?",
            a: "Professors can manage classes, assign grades, upload materials, and communicate with students.",
        },
        {
            q: "Why us?",
            a: "University Flow System offers a user-friendly interface, robust features, and dedicated support to enhance your academic experience. Our solution is also lightweight and easy to integrate with existing university systems.",
        },
    ];

    return (
        <div className="homepage">
            <div className="homepage-header">
                <div>
                    <span className="homepage-header-title"> Welcome to University Flow System!</span>
                </div>
                <span className="homepage-header-sub">Designed for seamless academic management.</span>
            </div>
            <div className="homepage-roles">
                <div className="homepage-center">
                    Manage your academic journey with ease, whether you're a Student, Professor, or Admin.
                </div>
                <div className="homepage-roles-cards">
                    <div className="homepage-roles-card">
                        <img src="/admin-line.svg" alt="Student Role" className="homepage-roles-card-image" />
                        <h2>Admin</h2>
                        <p>Oversee university operations, manage user roles, and ensure smooth functioning.</p>
                    </div>
                    <div className="homepage-roles-card">
                        <img src="/graduation-cap-line.svg" alt="Student Role" className="homepage-roles-card-image" />
                        <h2>Student</h2>
                        <p>Access your courses, track your progress, and connect with professors.</p>
                    </div>
                    <div className="homepage-roles-card">
                        <img src="/presentation-line.svg" alt="Student Role" className="homepage-roles-card-image" />

                        <h2>Professor</h2>
                        <p>Manage your classes and communicate with students</p>
                    </div>
                </div>
            </div>
            <div className="homepage-features" id="features">
                <h2>Key Features</h2>
                <div className="homepage-features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="homepage-feature-card">
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="homepage-faq" id="faq">
                <h2>Frequently Asked Questions</h2>
                <div className="homepage-faq-container">
                    {faqs.map((faq, index) => (
                        <div key={index} className="homepage-faq-item">
                            <button
                                className="homepage-faq-question"
                                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                            >
                                {faq.q}
                                <div className={`homepage-faq-toggle ${expandedFAQ === index ? "open" : ""}`}>
                                    <img src="/arrow-down-s-line.svg" />
                                </div>
                            </button>
                            {expandedFAQ === index && <div className="homepage-faq-answer">{faq.a}</div>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="homepage-access">
                <h1>
                    To gain access at your university, please contact us at{" "}
                    <a href="mailto:support@ufs.com">support@ufs.com</a>
                </h1>
            </div>

            <footer className="homepage-footer">
                <div className="homepage-footer-content">
                    <div className="homepage-footer-section">
                        <h4>About</h4>
                        <p>
                            University Flow System is designed to streamline academic management for institutions
                            worldwide.
                        </p>
                    </div>
                    <div className="homepage-footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li>
                                <a href="#features">Features</a>
                            </li>
                            <li>
                                <a href="#faq">FAQ</a>
                            </li>
                            <li>
                                <a>Support</a>
                            </li>
                        </ul>
                    </div>
                    <div className="homepage-footer-section">
                        <h4>Contact</h4>
                        <p>Email: support@ufs.com</p>
                        <p>© 2025 University Flow System. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
