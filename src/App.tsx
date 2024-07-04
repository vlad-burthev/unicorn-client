import Routers from "./routers/Routers";
import useAuthCheck from "./hooks/useAuthCheck";

const App = () => {
  useAuthCheck();

  return <Routers />;
};

export default App;
