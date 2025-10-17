import { TrendingUp, FileText, DollarSign, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const analyticsData = [
  {
    title: "Total Revenue",
    value: "$2,450,000",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-green-400",
  },
  {
    title: "Contracts Processed",
    value: "1,247",
    change: "+8.2%",
    icon: FileText,
    color: "text-blue-400",
  },
  {
    title: "Active Clients",
    value: "89",
    change: "+5.1%",
    icon: Users,
    color: "text-purple-400",
  },
  {
    title: "Avg Contract Value",
    value: "$98,500",
    change: "+3.7%",
    icon: TrendingUp,
    color: "text-orange-400",
  },
]

export function AnalyticsCard() {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Analytics Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {analyticsData.map((item, index) => {
          const IconComponent = item.icon
          return (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <IconComponent className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">{item.title}</p>
                  <p className="text-white text-lg font-semibold">{item.value}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-green-400 text-sm font-medium">{item.change}</span>
              </div>
            </div>
          )
        })}

        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h4 className="text-white font-medium mb-3">Contract Types Distribution</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Service Agreements</span>
              <span className="text-white text-sm">45%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">Purchase Orders</span>
              <span className="text-white text-sm">30%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }}></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">NDAs</span>
              <span className="text-white text-sm">25%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: "25%" }}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
