import React, {useState} from 'react';
import './ChatInterface.css'; // Create this CSS file to style the chat interface

function ChatInterface() {
    const [pastQuery, setPastQuery] = useState('');
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = async (event) => {
        // Update the chat box
        setPastQuery(query);
        // Clear previous response
        setResponse('');

        event.preventDefault();

        // Check if the query is empty
        if (!query.trim()) {
            return; // Do nothing if the query is empty or only contains whitespace
        }

        setLoading(true); // Set loading to true

        // Clear the input box after submitting
        setQuery('');

        const requestBody = {
            query: query
        };

        try {
            // Make a backend API call to get the response
            const response = await fetch('http://localhost:4000/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            const responseData = await response.json();

            // Set the response in the state
            setResponse(responseData.response);
        } catch (error) {
            console.error('Error fetching response:', error);
        } finally {
            setLoading(false); // Set loading back to false
        }
    };

    return (
        <div className="chat-interface">
            <head>
                <title>Email Insights Chatbot</title>
            </head>
            <div className="chat-container">
                <div className="chat">
                    <div className="chat-messages">
                        <div className="message user-message">
                            <p>{pastQuery}</p>
                        </div>
                        {response && (
                            <div className="message assistant-message">
                                <p>{response}</p>
                            </div>
                        )}
                        {loading && (
                            <div className="message loading-message">
                                <p>Loading...</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="input-container">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={query}
                            onChange={handleQueryChange}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleSubmit(event);
                                }
                            }}
                            placeholder="Type your query..."
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChatInterface;
