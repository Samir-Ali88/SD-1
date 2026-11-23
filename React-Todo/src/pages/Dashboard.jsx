import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  Plus,
  Search,
  Trash2,
  CheckCircle2,
  Circle,
  ArrowUpRight,
  Layers,
  ListChecks,
  Clock,
  Download,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"

const STORAGE_KEY = "devboard_projects_v1"

const INITIAL_PROJECTS = [
  {
    id: 101,
    title: "Initialize React + Vite + Tailwind + shadcn/ui",
    category: "Frontend",
    description: "Configure Vite aliases, Tailwind theme variables, and install reusable shadcn/ui components.",
    completed: true,
    createdAt: "Today, 9:00 AM",
  },
  {
    id: 102,
    title: "Implement useState, useEffect & useNavigate",
    category: "React Hooks",
    description: "Manage interactive form state, sync data with localStorage, and navigate cleanly between routes.",
    completed: true,
    createdAt: "Today, 10:15 AM",
  },
  {
    id: 103,
    title: "Push Complete Repository to GitHub",
    category: "Git & Deploy",
    description: "Stage all files, write a clear commit message, and verify the remote branch before tomorrow's class.",
    completed: false,
    createdAt: "Today, 11:30 AM",
  },
  {
    id: 104,
    title: "Rehearse 2-Minute Live Code Walkthrough",
    category: "Presentation",
    description: "Be ready to explain how props, hooks, and shadcn/ui components work together in the app.",
    completed: false,
    createdAt: "Today, 12:00 PM",
  },
]

export default function Dashboard() {
  // 1. useState: Manage project list, form inputs, search query, and filter tab
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS
  })
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Frontend")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const fileInputRef = useRef(null)

  // 3. useNavigate: Programmatic navigation to the Project Details route
  const navigate = useNavigate()

  // 2. useEffect: Sync projects to localStorage whenever `projects` state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  }, [projects])

  const handleAddProject = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      category,
      description: `Custom task added under ${category}. Click Inspect to view full route details.`,
      completed: false,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setProjects([newItem, ...projects])
    setTitle("")
  }

  const toggleProject = (id) => {
    setProjects(
      projects.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const deleteProject = (id) => {
    setProjects(projects.filter((item) => item.id !== id))
  }

  // Export tasks as a downloadable JSON backup file
  const handleExport = () => {
    const dataStr = JSON.stringify(projects, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `solo-todo-backup-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Import tasks from a saved JSON backup file
  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result)
        if (Array.isArray(imported)) {
          setProjects(imported)
        } else {
          alert("Invalid backup file format.")
        }
      } catch {
        alert("Could not read JSON file.")
      }
    }
    reader.readAsText(file)
    e.target.value = ""
  }

  // Stats calculations
  const totalCount = projects.length
  const completedCount = projects.filter((p) => p.completed).length
  const pendingCount = totalCount - completedCount
  const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  // Filter + Search logic
  const filteredProjects = projects.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    if (filter === "Completed") return matchesSearch && item.completed
    if (filter === "Pending") return matchesSearch && !item.completed
    return matchesSearch
  })

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50/70 via-slate-50 to-purple-50/60">
      {/* Top Navbar */}
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
              <Layers className="w-5 h-5" />
            </div>
            <h1 className="font-bold text-lg leading-none tracking-tight">TO-DO list</h1>
          </div>

          <div className="flex items-center gap-2.5">
            <Badge variant="secondary" className="font-bold tracking-wider px-3 py-1">
              SOLO
            </Badge>
            <a
              href="https://github.com/Samir-Ali88"
              target="_blank"
              rel="noreferrer"
            >
              <Button size="sm" variant="outline">
                GitHub
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                  <p className="text-3xl font-bold mt-1">{totalCount}</p>
                </div>
                <div className="h-11 w-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <ListChecks className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-3xl font-bold mt-1">{pendingCount}</p>
                </div>
                <div className="h-11 w-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Completion</p>
                <span className="text-sm font-bold text-primary">{completionRate}%</span>
              </div>
              <Progress value={completionRate} />
              <p className="text-xs text-muted-foreground">
                {completedCount} of {totalCount} milestones done
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Add New Task Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Add New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProject} className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="e.g., Add responsive mobile layout..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-9 rounded-lg border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="Frontend">Frontend</option>
                <option value="React Hooks">React Hooks</option>
                <option value="Git & Deploy">Git & Deploy</option>
                <option value="Presentation">Presentation</option>
              </select>
              <Button type="submit">
                <Plus className="w-4 h-4 mr-1.5" /> Add Task
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Filter, Search & Backup Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <TabsList>
            {["All", "Pending", "Completed"].map((tab) => (
              <TabsTrigger
                key={tab}
                active={filter === tab}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-white"
              />
            </div>

            <Button type="button" variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-1.5" /> Backup
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-1.5" /> Restore
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <Card className="py-12 text-center">
            <CardContent>
              <p className="text-muted-foreground text-sm">
                No matching tasks found. Try clearing your filter or adding a new one above!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((item) => (
              <Card
                key={item.id}
                className={`transition-all hover:shadow-md ${
                  item.completed ? "bg-slate-50/80 border-slate-200/80" : "bg-white"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant={item.completed ? "success" : "warning"}>
                      {item.completed ? "Completed" : "In Progress"}
                    </Badge>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <CardTitle
                    className={`text-base pt-2 leading-snug ${
                      item.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {item.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="pt-2 border-t flex items-center justify-between">
                  <button
                    onClick={() => toggleProject(item.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-primary transition-colors"
                  >
                    {item.completed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Mark Pending</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4 text-slate-400" />
                        <span>Mark Complete</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigate(`/project/${item.id}`, { state: { item } })}
                    >
                      Inspect <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => deleteProject(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer Section */}
      <footer className="border-t bg-white/80 backdrop-blur-md mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            <p className="text-sm font-semibold text-foreground">Samir Ali</p>
            <p className="text-xs text-muted-foreground">
              CS student exploring React, web development, algorithms &amp; problem solving.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">SOLO • TO-DO list</p>
        </div>
      </footer>
    </div>
  )
}