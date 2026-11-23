import { useNavigate } from "react-router-dom"
import { ArrowLeft, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutHooks() {
  const navigate = useNavigate()

  const concepts = [
    {
      name: "useState",
      where: "Dashboard.jsx",
      detail: "Stores the list of tasks, form inputs (title & category), search text, and active filter tab.",
    },
    {
      name: "useEffect",
      where: "Dashboard.jsx",
      detail: "1) Saves tasks to localStorage whenever tasks update. 2) Auto-rotates the presentation tip banner every 8 seconds.",
    },
    {
      name: "useNavigate",
      where: "Dashboard.jsx, ProjectDetail.jsx & AboutHooks.jsx",
      detail: "Switches pages cleanly without full browser reloads when inspecting a task or returning to the dashboard.",
    },
    {
      name: "shadcn/ui + Tailwind CSS",
      where: "src/components/ui/*",
      detail: "Uses Card, Button, Input, Badge, Progress, and Tabs components styled with Tailwind utility classes.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/70 via-slate-50 to-purple-50/60 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary mb-1">
            <Code2 className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">Presentation Guide</span>
          </div>
          <CardTitle className="text-2xl">Architecture & Hooks Breakdown</CardTitle>
          <CardDescription>
            Quick reference to explain your implementation during tomorrow's class presentation.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {concepts.map((c) => (
            <div key={c.name} className="p-4 rounded-xl border bg-white space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-primary">{c.name}</span>
                <Badge variant="secondary">{c.where}</Badge>
              </div>
              <p className="text-sm text-slate-600">{c.detail}</p>
            </div>
          ))}
        </CardContent>

        <CardFooter>
          <Button onClick={() => navigate("/")} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
