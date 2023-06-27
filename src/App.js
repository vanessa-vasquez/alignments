import "./App.css";
import Chart from "./components/Chart.js";
import FormChart from "./components/FormChart.js";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      custom: {
        main: "#6372fb",
        contrastText: "#fff",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormChart />}></Route>
          <Route path="/:id" element={<ValidateLink />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function ValidateLink() {
  let params = useParams();
  let userId = params.id.match(/^\w{4}-\w{3}$/);
  if (!userId) {
    return <FormChart />;
  }

  return <Chart />;
}

export default App;
