import { App } from "@/app"

import { createRoot } from "react-dom/client"

const rootEl = document.getElementById("__react")!
const root = createRoot(rootEl)

root.render(<App />)
