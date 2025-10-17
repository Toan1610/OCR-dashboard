"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, File, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function PDFUploadCard() {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    const pdfFile = files.find((file) => file.type === "application/pdf")
    if (pdfFile) {
      setUploadedFile(pdfFile)
      simulateUpload()
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setUploadedFile(file)
      simulateUpload()
    }
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const removeFile = () => {
    setUploadedFile(null)
    setUploadProgress(0)
    setIsUploading(false)
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>Upload PDF Document</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!uploadedFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver ? "border-blue-500 bg-blue-500/10" : "border-gray-700 hover:border-gray-600"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 mb-2">Drag and drop your PDF here</p>
            <p className="text-gray-500 text-sm mb-4">or</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose File
                <input id="file-upload" type="file" accept=".pdf" className="hidden" onChange={handleFileSelect} />
              </label>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <File className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-white font-medium">{uploadedFile.name}</p>
                  <p className="text-gray-400 text-sm">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={removeFile} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Uploading...</span>
                  <span className="text-gray-300">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="bg-gray-800" />
              </div>
            )}

            {uploadProgress === 100 && !isUploading && (
              <Button className="w-full bg-green-600 hover:bg-green-700">Process with OCR</Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
