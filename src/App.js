import './App.scss';
import { Layout } from './Layout/Layout';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { FormPage } from './Pages/Form/FormPage';
import { HomePage } from './Pages/Home/HomePage';

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route exact={true} path="/" element={<Navigate replace to={"Home"}/>} />
          <Route path="Home" element={<HomePage/>} />
          <Route path="Form" element={<FormPage/>} />
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
