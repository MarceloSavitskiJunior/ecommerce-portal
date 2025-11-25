import { Route, Routes } from "react-router-dom"
import { HomePage } from "./src/cases/home/home-page"
import { Header } from "./components/layout/header/header"

function App() {

  return (
    <div className="wrapper">
        <main className="w-full">
          <Header />
          <Routes>
            <Route path="/" element={HomePage()}></Route>
          </Routes>
        </main>
    </div>
  )
}

export default App
