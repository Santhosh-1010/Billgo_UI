import React, { useState, useRef, useEffect } from "react";
import UploadDocumentModal from "./Uploaddocumentmodal";
import "../styles/Chathistory.css";
import Neo from "../Assets/neoAI.png";
import BackArrow from "../Assets/back-arrow.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadChatDocument,
  uploadLinkDocument,
} from "../actions/chatDocumentActions";
import Swal from "sweetalert2";
import { fetchUserSession } from "../actions/userSessionActions";
import { FiCopy, FiEdit2 } from "react-icons/fi";
import {
  FaSearch,
  FaRegComments,
  FaPlus,
  FaFile,
  FaTimes,
  FaBars,
  FaTimes as FaTimesCircle,
  FaPaperPlane,
  FaUser,
  FaUpload,
  FaLink,
} from "react-icons/fa";
import axios from "axios";
import { partitionList } from "../actions/partitionAction";
import { IP } from "../utils/config";
import CustomLoader from "./CustomLoader"; // Import the new loader
import "../styles/CustomLoader.css"; // Import the loader styles
import { STATIC_CHAT_RESPONSES } from "../utils/constatnts";

export function Chathistory() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [showInputPopup, setShowInputPopup] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [typing, setTyping] = useState(false);
  const [DbQuery, setDbQuery] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pendingLoader, setPendingLoader] = useState(false); // State for pending loader

  const [uploadModalMode, setUploadModalMode] = useState("upload");
  const [fromModel, setFromModel] = useState("document");
  const fileInputRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const searchInputRef = useRef(null);
  const [formData, setFormData] = useState({
    partition: "",
    metadata: "",
    documenttype: "",
  });
  // Redux state
  const sessions = useSelector((state) => state.usersSession?.sessions || []);
  const userId = sessionStorage.getItem("user_id");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "partition") {
      setFormData((prev) => ({
        ...prev,
        partition: value,
        metadata: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  let dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  let role = sessionStorage.getItem("role");
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [partitionData, setPartitionData] = useState([]);

  const toggleSidebar = () => {
    setIsOpen((prevState) => !prevState);
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
    fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserSession(userId));
    }
  }, [dispatch, userId]);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  const hasUnsavedChanges = () => {
    return (
      message.trim() !== "" || selectedFile !== null || messages.length > 0
    );
  };
  const handleNewChatClick = () => {
    createNewChat();
  };

  useEffect(() => {
    const storedChatId = sessionStorage.getItem("currentChatId");
    if (storedChatId) {
      selectChat(storedChatId);
    }
  }, []);

  const createNewChat = async () => {
    sessionStorage.removeItem("currentChatId");
    if (isCreatingChat) {
      console.warn("A chat is already being created. Please wait.");
      return null;
    }
    setIsCreatingChat(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate a static session ID
      const sessionId = `session_${Date.now()}`;
      
      // Create a new chat object
      const newChat = {
        id: sessionId,
        title: "New Chat",
        messages: [],
        timestamp: new Date(),
      };
      
      // Save the current chat's messages before switching
      if (currentChatId && hasUnsavedChanges()) {
        setChatHistory((prev) =>
          prev.map((chat) =>
            chat.id === currentChatId ? { ...chat, messages } : chat
          )
        );
      }

      // Add the new chat to the chat history
      setChatHistory((prev) => [newChat, ...prev]);

      // Set the new chat as the current chat
      setCurrentChatId(sessionId);
      sessionStorage.setItem("currentChatId", sessionId);
      setMessages([]);
      setMessage("");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      setTimeout(() => {
        setIsCreatingChat(false);
      }, 300);

      return sessionId;
    } catch (error) {
      console.error("Error creating new chat:", error);
      setIsCreatingChat(false);
      return null;
    }
  };

  const selectChat = async (chatId) => {
    if (currentChatId) {
      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId ? { ...chat, messages: messages } : chat
        )
      );
    }
    setCurrentChatId(chatId);
    sessionStorage.setItem("currentChatId", chatId);

    try {
      // Call the API to fetch session details
      const response = await axios.get(
        `${IP}session-details?session_id=${chatId}`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      const sessionData = response.data;

      if (sessionData && sessionData.data) {
        const newMessages = sessionData.data.flatMap((item) => {
          const responseContent = item.response.error
            ? item.response.error
            : typeof item.response === "object"
              ? JSON.stringify(item.response, null, 2) // Pretty print object
              : item.response;

          return [
            {
              type: "user",
              content: item.query,
              timestamp: new Date(),
            },
            {
              type: item.response.error ? "error" : "ai",
              content: responseContent,
              timestamp: new Date(),
            },
          ];
        });
        setMessages(newMessages);
        setChatHistory((prev) =>
          prev.map((chat) =>
            chat.id === chatId ? { ...chat, messages: newMessages } : chat
          )
        );
      } else {
        console.error("No data found for the session.");
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching session details:", error);
      setMessages([]);
    }
  };


  const handleSubmit = async (e) => {
    setFormData({
      partition: "",
      metadata: "",
      documenttype: "",
    });
    e.preventDefault();
    if (!message.trim() && !selectedFile) return;
    setMessage("");
    setTyping(true);

    let sessionId = currentChatId;

    try {
      if (!sessionId) {
        sessionId = await createNewChat();
        if (!sessionId) {
          console.error("Session ID was not returned from createNewChat");
          return;
        }
        setCurrentChatId(sessionId);
      }

      const userMessage = {
        type: "user",
        content: message,
        file: selectedFile,
        timestamp: new Date(),
      };

      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      setChatHistory((prev) => {
        const existing = prev.find((chat) => chat.id === sessionId);
        const lastAskedTime = new Date();
        if (existing) {
          const updatedHistory = prev.map((chat) =>
            chat.id === sessionId
              ? {
                ...chat,
                messages: newMessages,
                title: message.slice(0, 30) || "New Chat",
                lastAskedTime,
              }
              : chat
          );
          return updatedHistory;
        } else {
          const newChat = {
            id: sessionId,
            messages: newMessages,
            title: message.slice(0, 30) || "New Chat",
            lastAskedTime,
          };
          return [...prev, newChat];
        }
      });

      const token = sessionStorage.getItem("access_token");

      const config = {
        headers: {},
      };

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Simulate API delay and use static responses
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get static response based on message content
      let responseContent = "I'm here to help you with your questions! This is a demo response. In a real application, I would process your query and provide relevant information.";
      
      // Check for specific queries and provide relevant static responses
      const queryLower = message.toLowerCase();
      for (const [key, value] of Object.entries(STATIC_CHAT_RESPONSES)) {
        if (queryLower.includes(key.toLowerCase().split(' ')[0]) || 
            queryLower.includes(key.toLowerCase().split(' ')[1])) {
          responseContent = value;
          break;
        }
      }

      dispatch(fetchUserSession(userId));
      const aiMessage = {
        type: "ai",
        content: responseContent,
        timestamp: new Date(),
      };

      const updatedMessages = [...newMessages, aiMessage];
      setMessages(updatedMessages);

      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === sessionId
            ? { ...chat, messages: updatedMessages }
            : chat
        )
      );
    } catch (err) {
      console.error("Error during submit or API call:", err);
    }

    setTyping(false);
    setMessage("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    scrollToBottom();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
      setMessage("");
    }
  };
  const checkJobStatus = async (jobId) => {
    const token = sessionStorage.getItem("access_token");
    setPendingLoader(true); // Show loader
    try {
      const response = await axios.get(`${IP}job-status/${jobId}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`, // Pass access_token in headers
        },
      });

      if (response.data?.status === "completed") {
        setPendingLoader(false);
        const resultStatus = response.data?.result?.result?.status;
        const message = response.data?.result?.result?.message;
        if (resultStatus === "already_exists") {
          Swal.fire({
            title: "Info",
            text: message || "Document already exists in the database.",
            icon: "info",
            confirmButtonText: "Ok",
          });
        } else if (resultStatus === "success") {
          Swal.fire({
            title: "Success",
            text: "Data ingestion completed successfully!",
            icon: "success",
            confirmButtonText: "Ok",
          });
        } else {
          Swal.fire({
            title: "Info",
            text: "Job completed with unknown status.",
            icon: "info",
            confirmButtonText: "Ok",
          });
        }
      } else if (response.data?.status === "failed") {
        setPendingLoader(false);
        Swal.fire({
          title: "Error",
          text: "Data ingestion failed.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        setTimeout(() => checkJobStatus(jobId), 5000);
      }
    } catch (error) {
      setPendingLoader(false);
      console.error("Error checking job status:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to check job status.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleUpload = (data) => {
    const token = sessionStorage.getItem("access_token");
    setLoading(true);
    if (fromModel === "document") {
      dispatch(uploadChatDocument(data))
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            if (response.data?.status === "pending") {
              checkJobStatus(response.data.job_id); // Call job status check
            } else if (response.data?.result?.status === "already_exists") {
              Swal.fire({
                title: "Info",
                text: "Already Exists",
                icon: "info",
                confirmButtonText: "Ok",
              });
            } else {
              Swal.fire({
                title: "Success",
                text: "File has been successfully uploaded.",
                icon: "success",
                confirmButtonText: "Ok",
              });
            }
          } else {
            Swal.fire({
              title: "Error",
              text: response?.data.status,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          Swal.fire({
            title: "Error",
            text: "Something went wrong",
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    }
    if (fromModel === "link") {
      dispatch(uploadLinkDocument(data))
        .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            if (response.data?.status === "pending") {
              checkJobStatus(response.data.job_id); // Call job status check
            } else if (response.data?.result?.status === "already_exists") {
              Swal.fire({
                title: "Info",
                text: "Already Exists",
                icon: "info",
                confirmButtonText: "Ok",
              });
            } else {
              Swal.fire({
                title: "Success",
                text: "Document has been successfully uploaded.",
                icon: "success",
                confirmButtonText: "Ok",
              });
            }
          } else {
            Swal.fire({
              title: "Error",
              text: response?.data.status,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          Swal.fire({
            title: "Error",
            text: "Something went wrong",
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    }
  };
  const handleSearchFocus = () => {
    setIsSearching(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      if (!searchQuery) {
        setIsSearching(false);
      }
    }, 200);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const results = chatHistory.reduce(
      (acc, chat) => {
        const titleMatch = chat.title.toLowerCase().includes(query);

        const messageMatches = chat.messages
          .filter((msg) => msg.content.toLowerCase().includes(query))
          .map((msg) => ({
            ...msg,
            chatId: chat.id,
            chatTitle: chat.title,
          }));

        if (titleMatch) {
          acc.chats.push(chat);
        }

        if (messageMatches.length > 0) {
          acc.messages.push(...messageMatches);
        }

        return acc;
      },
      { chats: [], messages: [] }
    );

    setSearchResults(results);
    setIsSearching(true);
  };
  const handleSearchResultClick = (chatId, messageIndex = 0) => {
    selectChat(chatId);

    setSearchQuery("");

    if (messageIndex > 0) {
      setTimeout(() => {
        const messageElements = chatMessagesRef.current?.children;
        if (messageElements && messageElements[messageIndex]) {
          messageElements[messageIndex].scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };
  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };
  React.useEffect(() => {
    const handleClickOutside = () => setShowInputPopup(false);
    if (showInputPopup) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showInputPopup]);
  useEffect(() => {
    dispatch(partitionList({ role: role }))
      .then((response) => {
        setPartitionData(response.data || []);
      })
      .catch((err) => {
        console.error("Error fetching partition list:", err);
      });
  }, [dispatch, role]);
  const metadataOptions = formData.partition
    ? partitionData.find((item) => item.Partition === formData.partition)
      ?.Partition_value || []
    : [];

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEditClick = (index, currentText) => {
    setEditIndex(index);
    setEditText(currentText);
  };

  const [shouldSubmit, setShouldSubmit] = useState(false);

  const handleSubmitEdit = async (index) => {
    setMessage(editText);
    setEditIndex(null);
    setShouldSubmit(true);
  };



  useEffect(() => {
    if (shouldSubmit) {
      const fakeEvent = { preventDefault: () => { } };
      handleSubmit(fakeEvent);
      setShouldSubmit(false);
    }
  }, [shouldSubmit, handleSubmit]);

  const copyToClipboard = async (text) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return true;
      }

      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (!success) throw new Error("Fallback copy failed");
      return true;
    } catch (err) {
      console.error("Copy failed:", err);
      return false;
    }
  };


  return (
    <div className="app-container">
      {loading && <CustomLoader message="Loading data..." />}
      {pendingLoader && <CustomLoader message="Processing job..." />}
      <div className={`sidebarchat ${isOpen ? "open" : "closed"}`}>
        <div className="logo-section row-flex">
          <button
            onClick={() => navigate("/gitmetrics")}
            className="back-button"
          >
            <img src={BackArrow} alt="Back icon" className="back-icon" />
            <span style={{ fontSize: "14px" }}>Back</span>
          </button>
          <div className="button-group">
            <button className="new-chat-btn" onClick={handleNewChatClick}>
              <FaPlus />
            </button>
            <button className="toggle-btn" onClick={toggleSidebar}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search messages"
            value={searchQuery}
            onChange={handleSearch}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            ref={searchInputRef}
          />
          {isSearching &&
            (searchResults.chats?.length > 0 ||
              searchResults.messages?.length > 0) && (
              <div className="search-results">
                {searchResults.chats?.length > 0 && (
                  <div className="search-section">
                    <div className="search-section-header">Chats</div>
                    {searchResults.chats.map((chat) => (
                      <div
                        key={chat.id}
                        className="search-result-item"
                        onClick={() => handleSearchResultClick(chat.id)}
                      >
                        <FaRegComments className="result-icon" />
                        <div className="result-content">
                          <div className="result-title">{chat.title}</div>
                          <div className="result-subtitle">
                            {formatTime(chat.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {searchResults.messages?.length > 0 && (
                  <div className="search-section">
                    <div className="search-section-header">Messages</div>
                    {searchResults.messages.map((msg, index) => (
                      <div
                        key={`${msg.chatId}-${index}`}
                        className="search-result-item"
                        onClick={() =>
                          handleSearchResultClick(msg.chatId, index)
                        }
                      >
                        {msg.type === "user" ? (
                          <FaUser className="result-icon" />
                        ) : (
                          <img
                            src={Neo}
                            alt="Add icon"
                            className="neo-ai-logo"
                          />
                        )}
                        <div className="result-content">
                          <div className="result-title">{msg.content}</div>
                          <div className="result-subtitle">
                            {msg.chatTitle} • {formatTime(msg.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
        </div>
        <div className="sidebar-content">
          <div className="chat-history">
            {sessions.map((session) => (
              <div
                key={session.session_id}
                className={`sidebar-item ${currentChatId === session.session_id ? "active" : ""
                  }`}
                onClick={() => selectChat(session.session_id)}
              >
                <FaRegComments className="item-icon" />
                <span className="item-title">
                  {session.earliest_query || "New Chat"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {!isOpen && (
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      )}
      <div className={`main-content ${isOpen ? "shifted" : ""}`}>
        <div className="chat-area">
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div
                className="welcome-screen text-center text-lg text-gray-700"
                style={{ marginTop: "17%", marginRight: "8%" }}
              >
                What can I help with?
              </div>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.type}`}>
                    <div className="message-avatar">
                      {msg.type === "user" ? (
                        <FaUser />
                      ) : (
                        <img src={Neo} alt="Neo AI" className="neo-ai-logo" />
                      )}
                    </div>
                    <div className="message-content">
                      <div className="message-header">
                        <span className="message-author">
                          {msg.type === "user"
                            ? "You"
                            : msg.type === "ai"
                              ? "Neo AI"
                              : "Error"}
                        </span>
                        <span className="message-time">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      <div className="mb-5 position-relative d-flex flex-column">
                        <div
                          className="message-text align-self-end"
                          style={msg.type === "error" ? { color: "red" } : {}}
                        >
                          {editIndex === index && msg.type === "user" ? (
                            <textarea
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="form-control textarea-edit"
                              rows={3}
                            />
                          ) : (
                            <div >{msg.content}</div>
                          )}
                          {(msg.type === "ai" || msg.type === "error") && (
                            <div className="copy-wrapper position-absolute top-0 end-0">
                              <FiCopy
                                className="copy-icon "
                                size={15}
                                style={{ cursor: "pointer" }}
                                onClick={() => copyToClipboard(msg.content)}
                              />
                              <span className="copied-text">Copied</span>
                            </div>
                          )}
                        </div>

                        {msg.type === "user" && (
                          <div className="d-flex justify-content-end mt-2">
                            <div className="copy-wrapper me-2">
                              <FiCopy
                                className="copy-icon"
                                size={15}
                                style={{ cursor: "pointer" }}
                                onClick={() => copyToClipboard(msg.content)}
                              />
                              <span className="copied-text">Copied</span>
                            </div>
                            {editIndex === index ? (
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={handleSubmitEdit}
                              >
                                Submit
                              </button>
                            ) : (
                              <FiEdit2
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleEditClick(index, msg.content)
                                }
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="message ai">
                    <div className="message-avatar">
                      <img src={Neo} alt="Neo AI" className="neo-ai-logo" />
                    </div>
                    <div className="message-content">
                      <div className="message-header">
                        <span className="message-author">Neo AI</span>
                        <span className="message-time">
                          {formatTime(new Date())}
                        </span>
                      </div>
                      <div className="message-text typing-animation">
                        Generating
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>

        <div className="chat-input-container">
          <div className="chat-input-wrapper" style={{ width: isOpen ? '90%' : '70%' }}>
            <form onSubmit={handleUpload} className="chat-input-form">
              {selectedFile && (
                <div className="file-preview">
                  <div className="file-info">
                    <FaFile className="file-icon" />
                    <span className="file-name">{selectedFile.name}</span>
                  </div>
                  <button
                    type="button"
                    className="remove-file"
                    onClick={handleRemoveFile}
                  >
                    <FaTimesCircle />
                  </button>
                </div>
              )}

              <div className="input-wrapper input-wrapper-relative">
                <div className="plus-popup-container">
                  <button
                    type="button"
                    className="action-btn attach-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowInputPopup((prev) => !prev);
                    }}
                    title="More options"
                  >
                    <FaPlus />
                  </button>
                  {showInputPopup && (
                    <div
                      className="options-popup"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className="popup-option"
                        onClick={() => {
                          setShowInputPopup(false);
                          setUploadModalMode("upload");
                          setFromModel("document");
                          setShowUploadModal(true);
                        }}
                      >
                        <FaUpload className="option-icon" /> Upload Document
                      </div>
                      <div
                        className="popup-option"
                        onClick={() => {
                          setShowInputPopup(false);
                          setFromModel("link");
                          setUploadModalMode("link");
                          setShowUploadModal(true);
                        }}
                      >
                        <FaLink className="option-icon" /> Link
                      </div>
                    </div>
                  )}
                </div>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything"
                  rows="1"
                  className="chat-input"
                />

                <div className="input-actions">
                  {(message.trim() || selectedFile) && (
                    <button
                      type="submit"
                      className="action-btn send-btn"
                      aria-label="Send message"
                      onClick={handleSubmit}
                    >
                      <FaPaperPlane />
                      <span className="tooltip">Send message</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="d-flex align-items-center gap-4 flex-wrap pt-3">
                {/* Db Query */}
                <div
                  className="d-flex align-items-center gap-2"
                  style={{ minWidth: "100px" }}
                >
                  <input
                    type="checkbox"
                    id="sessionCheckbox"
                    checked={DbQuery}
                    onChange={(e) => setDbQuery(e.target.checked)}
                    className="form-check-input"
                    style={{
                      width: "13px",
                      height: "13px",
                      verticalAlign: "middle",
                      marginTop: "1px", // tweak as needed for pixel-perfect alignment
                    }}
                  />
                  <label
                    htmlFor="sessionCheckbox"
                    className="form-check-label fw-medium"
                    style={{
                      fontSize: "13px",
                      color: "#333",
                      lineHeight: "1.2",
                      marginBottom: "0", // ensures label doesn't drop lower
                    }}
                  >
                    Db Query
                  </label>
                </div>

                <div
                  className="d-flex align-items-center gap-2"
                  style={{ minWidth: "220px" }}
                >
                  <label
                    htmlFor="partitionSelect"
                    className="fw-medium"
                    style={{
                      width: "70px",
                      fontSize: "0.9rem",
                      color: "#333",
                    }}
                  >
                    Partition
                  </label>
                  <select
                    id="partitionSelect"
                    name="partition"
                    value={formData.partition}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                    style={{
                      minWidth: "140px",
                      fontSize: "0.85rem",
                      borderRadius: "8px",
                      padding: "4px 8px",
                    }}
                  >
                    <option value="">-- Select --</option>
                    {partitionData?.map((partition) => (
                      <option
                        key={partition.Partition}
                        value={partition.Partition}
                      >
                        {partition.Partition}
                      </option>
                    ))}
                  </select>
                </div>
                {formData.partition &&
                  (() => {
                    const selectedPartition = partitionData?.find(
                      (p) => p.Partition === formData.partition
                    );
                    return selectedPartition?.Partition_value?.length > 0;
                  })() && (
                    <div
                      className="d-flex align-items-center gap-2"
                      style={{ minWidth: "250px" }}
                    >
                      <label
                        htmlFor="metadataSelect"
                        className="fw-medium"
                        style={{
                          width: "70px",
                          fontSize: "0.9rem",
                          color: "#333",
                        }}
                      >
                        Metadata
                      </label>
                      <select
                        id="metadataSelect"
                        name="metadata"
                        value={formData.metadata}
                        onChange={handleInputChange}
                        required
                        className="form-select"
                        style={{
                          minWidth: "140px",
                          fontSize: "0.85rem",
                          borderRadius: "8px",
                          padding: "4px 8px",
                        }}
                      >
                        <option value="">-- Select --</option>
                        {metadataOptions.map((meta) => (
                          <option key={meta} value={meta}>
                            {meta}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <UploadDocumentModal
        open={showUploadModal}
        from={fromModel}
        onClose={() => setShowUploadModal(false)}
        onSubmit={(data) => {
          setShowUploadModal(false);
          handleUpload(data);
        }}
        mode={uploadModalMode}
      />
    </div>
  );
}
export default Chathistory;
