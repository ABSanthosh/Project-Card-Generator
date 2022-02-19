import { Route, Routes } from "react-router-dom";
import * as views from "./views";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<views.Home />} />
    </Routes>
  );
}
