import { useLocation, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, CheckCircle2, Clock, FolderKanban, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProjectDetail() {
  const { id } = useParams()
  const location = useLocation()
  // useNavigate used to go back to the main Dashboard
  const navigate = useNavigate()

  const saved = JSON.parse(localStorage.getItem("devboard_projects_v1") || "[]")
  const item = location.state?.item || saved.find((p) => String(p.id) === id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/70 via-slate-50 to-purple-50/60 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline">Dynamic Route: /project/{id}</Badge>
            {item && (
              <Badge variant={item.completed ? "success" : "warning"}>
                {item.completed ? "Completed" : "In Progress"}
              </Badge>
            )}
          </div>
          <CardTitle className="text-2xl pt-3">
            {item ? item.title : "Task Not Found"}
          </CardTitle>
          <CardDescription>
            Navigated programmatically using React Router's <code className="text-primary font-semibold">useNavigate()</code> hook.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {item ? (
            <>
              <div className="p-4 rounded-xl bg-slate-50 border space-y-3">
                <p className="text-sm text-slate-700 leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-4 pt-2 border-t text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <FolderKanban className="w-4 h-4 text-primary" />
                    Category: <strong className="text-foreground">{item.category}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary" />
                    Added: <strong className="text-foreground">{item.createdAt}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-600" />
                    )}
                    Status: <strong className="text-foreground">{item.completed ? "Done" : "Pending"}</strong>
                  </span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              This item does not exist or was deleted.
            </p>
          )}
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
