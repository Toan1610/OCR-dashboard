"use client"

import { BarChart3, Bot, FileText, Home, Settings, Upload, FileSearch } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", icon: Home, id: "dashboard" },
  { title: "Upload Document", icon: Upload, id: "upload" },
  { title: "OCR Result", icon: FileSearch, id: "ocr-result" },
  { title: "Contract Summary", icon: FileText, id: "contract-summary" },
  { title: "Analytics", icon: BarChart3, id: "analytics" },
  { title: "Chatbot", icon: Bot, id: "chatbot" },
  { title: "Settings", icon: Settings, id: "settings" },
]

interface AppSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-gray-800 bg-gray-900">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">OCR Pro</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    isActive={activeSection === item.id}
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:bg-blue-600 data-[active=true]:text-white transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
