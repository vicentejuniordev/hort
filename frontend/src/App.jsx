import InitialScreenClient from './pages/InitialScreenClient/InitialScreenClient';
import {BrowserRouter} from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <InitialScreenClient />
    </BrowserRouter>
  );
}