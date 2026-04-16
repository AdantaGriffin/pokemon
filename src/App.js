import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from './Components/Root/root';
import Home from './Components/Home/home';
import Details from './Components/Details/details';

const AppRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root/>}>
    <Route index element={<Home/>}/>
    <Route path=":id" element={<Details/>}/>
  </Route>
))

function App() {

  return (
    <>
      <RouterProvider router={AppRouter}/>
    </>
  );
}

export default App;


