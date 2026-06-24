import { BrowserRouter } from "react-router-dom";
import { FormProvider } from "./context/FormContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <FormProvider>
        <AppRoutes />
      </FormProvider>
    </BrowserRouter>
  );
}

export default App;
