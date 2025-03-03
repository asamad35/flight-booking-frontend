import { Toaster } from "react-hot-toast";
import Home from "@/components/Home";
function App() {
  return (
    <div>
      <Toaster position="bottom-center" />
      <Home />
    </div>
  );
}

export default App;
