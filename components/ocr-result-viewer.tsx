"use client"

import { useState } from "react"
import { Copy, Download, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"

const sampleOCRText = `PROFESSIONAL SERVICES AGREEMENT

This Professional Services Agreement ("Agreement") is entered into on March 15, 2024, between:

CLIENT: TechCorp Solutions Inc.
Address: 123 Business Ave, Suite 100, San Francisco, CA 94105
Contact: John Smith, CEO
Email: john.smith@techcorp.com

SERVICE PROVIDER: Digital Consulting LLC
Address: 456 Innovation Drive, Austin, TX 78701
Contact: Sarah Johnson, Managing Director
Email: sarah@digitalconsulting.com

SCOPE OF WORK:
The Service Provider agrees to provide the following services:
- Software development consulting
- System architecture design
- Technical documentation
- Project management support

CONTRACT TERMS:
- Start Date: April 1, 2024
- End Date: September 30, 2024
- Total Contract Value: $125,000
- Payment Terms: Net 30 days
- Milestone Payments: 25% upon signing, 25% at 3 months, 50% upon completion

DELIVERABLES:
1. Technical specification document
2. System architecture blueprint
3. Implementation roadmap
4. Final project report

This agreement is governed by the laws of California.

Signatures:
Client: _________________ Date: _________
Service Provider: ________ Date: _________`

export function OCRResultViewer() {
  const [extractedText] = useState(sampleOCRText)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(extractedText)
      toast.success("Text copied to clipboard")
    } catch (err) {
      toast.error("Failed to copy text")
    }
  }

  const downloadText = () => {
    const blob = new Blob([extractedText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "ocr-result.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Text file downloaded")
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>OCR Result</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 bg-transparent"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadText}
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full rounded-md border border-gray-700 p-4">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">{extractedText}</pre>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
