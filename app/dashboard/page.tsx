"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { PDFUploadCard } from "@/components/pdf-upload-card"
import { OCRResultViewer } from "@/components/ocr-result-viewer"
import { ContractSummary } from "@/components/contract-summary"
import { AnalyticsCard } from "@/components/analytics-card"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-950">
        <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <SidebarInset className="flex-1">
          <TopNavbar />
          <main className="flex-1 p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PDFUploadCard />
              <OCRResultViewer />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <ContractSummary />
              </div>
              <div>
                <AnalyticsCard />
              </div>
            </div>
          </main>
          <ChatbotWidget />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
