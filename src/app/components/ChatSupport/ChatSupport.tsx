import React, { useState } from "react";

import axios from "axios";

export function BaselineSend(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="1.5em"
  height="1.5em"
  {...props}
>
  <path
    fill="currentColor"
    d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z"
  />
</svg>
  )
}

export function BotSparkle32Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M17 3a1 1 0 1 0-2 0v1h-4.75A3.25 3.25 0 0 0 7 7.25v5.5A3.25 3.25 0 0 0 10.25 16h10.665l.505-1.58a2.16 2.16 0 0 1 .8-1a2.14 2.14 0 0 1 1.25-.4a2.16 2.16 0 0 1 1.428.542q.101-.391.102-.812v-5.5A3.25 3.25 0 0 0 21.75 4H17zM8.25 19h8.496c-.16.307-.245.65-.246 1a2.17 2.17 0 0 0 1.45 2l1.71.56c.29.093.554.254.77.47c0 .036.04.072.084.111a.5.5 0 0 1 .076.079a1.8 1.8 0 0 1 .31.58l.55 1.7a2.16 2.16 0 0 0 3.3 1.08a1.9 1.9 0 0 0-.25.9q0 .088.008.175a8 8 0 0 1-.521.377C22.08 29.302 19.366 30 16 30s-6.08-.698-7.987-1.968C6.077 26.742 5 24.871 5 22.7v-.45A3.25 3.25 0 0 1 8.25 19m4.25-7.25a1.75 1.75 0 1 1 0-3.5a1.75 1.75 0 0 1 0 3.5M21.25 10a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0m.238 12.011a3.5 3.5 0 0 1 .837 1.363l.548 1.683a.664.664 0 0 0 1.254 0l.548-1.683a3.47 3.47 0 0 1 2.197-2.196l1.684-.547a.665.665 0 0 0 0-1.254l-.034-.008l-1.683-.547a3.47 3.47 0 0 1-2.198-2.196l-.547-1.683a.664.664 0 0 0-1.255 0l-.547 1.683l-.014.042a3.47 3.47 0 0 1-2.15 2.154l-1.684.547a.665.665 0 0 0 0 1.254l1.684.546c.513.171.979.46 1.36.842m9.333 4.847l.918.298l.019.004a.362.362 0 0 1 0 .684l-.919.298a1.9 1.9 0 0 0-1.198 1.198l-.299.918a.363.363 0 0 1-.684 0l-.299-.918a1.89 1.89 0 0 0-1.198-1.202l-.919-.298a.362.362 0 0 1 0-.684l.919-.298a1.9 1.9 0 0 0 1.18-1.198l.299-.918a.363.363 0 0 1 .684 0l.298.918a1.89 1.89 0 0 0 1.199 1.198"
      ></path>
    </svg>
  )
}


const ChatSupport = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! Please describe your database structure, including tables, columns, and relationships. For example, 'I have a database with a Customers table that includes columns for ID, Name, and Email.' Once you provide the details, I will generate the SQL scripts for you!", type: "system" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: "here's the description for the table: " + "return the results as a sql query that create the correspend table" + input, type: "user" }]);
      const userMessage = input;
      setInput("");
      setLoading(true);

      try {
        const response = await axios.post(
          "http://localhost:8082/api/chat",
          { message: userMessage },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data, type: "support" },
        ]);
      } catch (error) {
        console.error("Error communicating with the chat API:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error: Unable to connect to the AI", type: "system" },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section id="chat-support-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center bg-white">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
            onClick={toggleChat}
          >
            Generate SQL Query
          </button>
        </div>

        {isOpen && (
          <div className="chat-support-container mt-8 mx-auto p-6 bg-white rounded-lg shadow-md w-full">
            <div className="chat-header flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                SQL Script Generator
              </h3>
              <button
                className="text-green font-bold"
                onClick={toggleChat}
              >
                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z" fill="#1C274C"/>
</svg>
              </button>
            </div>
            <div className="chat-messages max-h-64 overflow-y-auto mb-4">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`chat-message p-2 rounded-md mb-2 flex items-start ${
        msg.type === "user"
          ? "bg-green-100 text-black"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Bot Icon for Bot Messages */}
      {msg.type === "bot" && (
        <div className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
            className="text-gray-600"
          >
            <path d="M12 2a2 2 0 012 2v2h4a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4V4a2 2 0 012-2zm0 2h-1v3h2V4h-1zm-4 4H6v12h12V8h-2v2h-2V8h-4v2H8V8zm4 4h4v2h-4v-2zm0 4h4v2h-4v-2z" />
          </svg>
        </div>
      )}
      {/* Message Text */}
      <div>{msg.text}</div>
    </div>
  ))}
</div>
            <div className="chat-input-container text-white flex items-center gap-2">
              <input
                type="text"
                className="flex-1 p-2 text-black border rounded-md"
                placeholder="Describe your database..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="bg-green-600 hover:bg-green-700  font-semibold py-2 px-4 rounded-lg"
                onClick={handleSend}
              >
                <BaselineSend/>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChatSupport;