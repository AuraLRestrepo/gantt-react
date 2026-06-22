import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { TasksProvider } from "./store/TasksContext";

function App() {
  return (
    <TasksProvider>
      <RouterProvider router={router} />
    </TasksProvider>
  );
}

export default App;
