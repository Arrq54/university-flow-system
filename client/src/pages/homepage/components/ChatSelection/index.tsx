import React from "react";
import "./style.css";

const sampleMessages = [
    { user1: { id: 1, sender: "Alice", text: "Hello!" } },
    { user2: { id: 2, sender: "Bob", text: "Hi there!" } },
];

export default function ChatSelection() {
    const chatters = [...new Set(sampleMessages.flatMap(Object.keys))];
    return (
        <div className="chat-selection">
            {chatters.map((chatter) => (
                <div key={chatter} className="chat-message">
                    <strong>{chatter}:</strong> {/* You might want to display messages here */}
                </div>
            ))}
        </div>
    );
}
