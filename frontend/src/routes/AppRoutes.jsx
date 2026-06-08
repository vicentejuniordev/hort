import {Routes, Route} from 'react-router-dom';
import InitialScreen from '../pages/InitialScreen/InitialScreen';
import LoginScreen from '../pages/ClientLogin/LoginScreen';
import RegisterUser from '../pages/RegisterUser/RegisterUser';
import RegisterProducer from '../pages/RegisterProducer/RegisterProducer';
import SelectProfile from '../pages/SelectProfile/SelectProfile';
import InitialScreenClient from '../pages/InitialScreenClient/InitialScreenClient';
import BasketScreen from '../pages/BasketScreen/BasketScreen';
import ViewHorta from '../pages/ViewHorta/ViewHorta';
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<InitialScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterUser />} />
      <Route path="/register-producer" element={<RegisterProducer />} />
      <Route path="/select-profile" element={<SelectProfile />} />
      <Route path="/home-client" element={<InitialScreenClient />} />
      <Route path="/minhas-cestas" element={<BasketScreen />} />
      <Route path="/view-horta" element={<ViewHorta />} />
    </Routes>
  );
}