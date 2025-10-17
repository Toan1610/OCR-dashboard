import { Calendar, DollarSign, User, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const contractData = [
  {
    field: "Client Name",
    value: "TechCorp Solutions Inc.",
    icon: User,
    type: "text",
  },
  {
    field: "Contract Date",
    value: "March 15, 2024",
    icon: Calendar,
    type: "date",
  },
  {
    field: "Start Date",
    value: "April 1, 2024",
    icon: Calendar,
    type: "date",
  },
  {
    field: "End Date",
    value: "September 30, 2024",
    icon: Clock,
    type: "date",
  },
  {
    field: "Total Value",
    value: "$125,000",
    icon: DollarSign,
    type: "currency",
  },
  {
    field: "Payment Terms",
    value: "Net 30 days",
    icon: Clock,
    type: "text",
  },
  {
    field: "Service Provider",
    value: "Digital Consulting LLC",
    icon: User,
    type: "text",
  },
  {
    field: "Status",
    value: "Active",
    icon: Clock,
    type: "status",
  },
]

export function ContractSummary() {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <DollarSign className="w-5 h-5" />
          <span>Contract Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700">
              <TableHead className="text-gray-300">Field</TableHead>
              <TableHead className="text-gray-300">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contractData.map((item, index) => {
              const IconComponent = item.icon
              return (
                <TableRow key={index} className="border-gray-700 hover:bg-gray-800/50">
                  <TableCell className="text-gray-300">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="w-4 h-4 text-gray-400" />
                      <span>{item.field}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    {item.type === "status" ? (
                      <Badge
                        variant={item.value === "Active" ? "default" : "secondary"}
                        className={item.value === "Active" ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {item.value}
                      </Badge>
                    ) : item.type === "currency" ? (
                      <span className="font-semibold text-green-400">{item.value}</span>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
