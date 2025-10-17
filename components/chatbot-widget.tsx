"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, Send, X, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Message {
  id: string
  text: string
  sender: "user" | "assistant"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! I'm your OCR assistant. I can help you with questions about your documents, contracts, and OCR results. How can I assist you today?",
    sender: "assistant",
    timestamp: new Date(),
  },
]

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")

  const sendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAssistantResponse(inputValue),
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const getAssistantResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("contract") || input.includes("agreement")) {
      return "I can help you analyze contract details. Based on your recent upload, I see you have a Professional Services Agreement with TechCorp Solutions Inc. worth $125,000. Would you like me to extract specific information from this contract?"
    } else if (input.includes("ocr") || input.includes("extract")) {
      return "OCR (Optical Character Recognition) has successfully processed your document. The extracted text shows a professional services agreement with key details like client information, contract value, and terms. Is there specific data you'd like me to highlight?"
    } else if (input.includes("summary") || input.includes("details")) {
      return "Here's a quick summary of your latest contract: Client: TechCorp Solutions Inc., Value: $125,000, Duration: April 1 - September 30, 2024, Payment Terms: Net 30 days. Would you like more detailed information about any specific aspect?"
    } else {
      return "I'm here to help with your document analysis and OCR results. You can ask me about contract details, extracted text, or any specific information from your uploaded documents. What would you like to know?"
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800 text-white">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-blue-400" />
              <span>OCR Assistant</span>
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogHeader>

          <div className="flex flex-col h-96">
            <ScrollArea className="flex-1 p-4 border border-gray-700 rounded-lg mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-100"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === "assistant" && (
                          <Bot className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                        )}
                        {message.sender === "user" && <User className="w-4 h-4 mt-0.5 text-white flex-shrink-0" />}
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your documents..."
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700" size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
