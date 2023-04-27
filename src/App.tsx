import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home-page/Home';
import { NavBar } from './components/navbar/navigation-bar';
import { ProtectedRoute } from './protected-route/protected-route';
import { JokesForm } from './components/jokes/jokes-form/jokes-form';
import { ErrorComp } from './components/error/error-component';

export const App = () => {
  return (
    <>
      {/* <React.StrictMode> */}
      <Router>
        <NavBar />
        <div className="main-body__container">
          <Routes>
            <Route path="*" element={<ErrorComp />} />
            <Route path="">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add"
                element={
                  <ProtectedRoute>
                    <JokesForm isAddMode />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit/:jokeId"
                element={
                  <ProtectedRoute>
                    <JokesForm isAddMode={false} />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </div>
      </Router>
      {/* </React.StrictMode> */}
    </>
  );
};
