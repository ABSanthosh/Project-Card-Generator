import { StoreProvider } from "easy-peasy";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import store from "./Store/Store";

function App() {
  return (
    <BrowserRouter>
      <StoreProvider store={store}>
        <Router />
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
