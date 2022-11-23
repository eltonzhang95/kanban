import Kanban from "./pages/Kanban"
import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Kanban />
    </Provider>
  );
}

export default App;
