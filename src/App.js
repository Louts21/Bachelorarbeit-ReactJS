import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './assets/App.css';
import Welcome from './Component/Welcome';
import Footer from './Component/Footer';
import Header from './Component/Header';
import Data from './Component/Data';
import NotFound from './Component/NotFound';

// https://reactrouter.com/en/main/start/tutorial
const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/data",
    element: <Data />,
  },
  {
    path: "*",
    element: <NotFound/>,
  }
]);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <RouterProvider router={router} />
        <Footer />
      </header>
    </div>
  );
}

export default App;
