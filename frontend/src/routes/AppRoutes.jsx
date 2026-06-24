import {Routes, Route} from 'react-router-dom';
import InitialScreen from '../pages/InitialScreen/InitialScreen';
import LoginScreen from '../pages/ClientLogin/LoginScreen';
import RegisterUser from '../pages/RegisterUser/RegisterUser';
import RegisterProducer from '../pages/RegisterProducer/RegisterProducer';
import SelectProfile from '../pages/SelectProfile/SelectProfile';
import InitialScreenClient from '../pages/InitialScreenClient/InitialScreenClient';
import BasketScreen from '../pages/BasketScreen/BasketScreen';
import ViewHorta from '../pages/ViewHorta/ViewHorta';
import ChatCliente from '../pages/ChatCliente/ChatCliente';
import MessageDetailScreen from '../pages/MessageDetailScreen/MessageDetailScreen';
import ClientProfile from '../pages/ClientProfile/ClientProfile';
import CartScreen from '../pages/CartScreen/CartScreen';
import ProducerDashboard from '../pages/ProducerDashboard/ProducerDashboard';
import ProducerManagerPlans from '../pages/ProducerManagerPlans/ProducerManagerPlans';
import ProducerProfile from '../pages/ProducerProfile/ProducerProfile';
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<InitialScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/registrar-cliente" element={<RegisterUser />} />
      <Route path="/registrar-produtor" element={<RegisterProducer />} />
      <Route path="/selecionar-perfil" element={<SelectProfile />} />
      <Route path="/home-client" element={<InitialScreenClient />} />
      <Route path="/minhas-cestas" element={<BasketScreen />} />
      <Route path="/view-horta/:id?" element={<ViewHorta />} />
      <Route path="/mensagens" element={<ChatCliente />} />
      <Route path="/mensagens/:id" element={<MessageDetailScreen />} />
      <Route path="/perfil" element={<ClientProfile />} />
      <Route path="/carrinho/:hortaId" element={<CartScreen />} />
      <Route path="/produtor" element={<ProducerDashboard />} />
      <Route path="/produtor/gerenciar-planos" element={<ProducerManagerPlans />} />
      <Route path="/produtor/mensagens" element={<ChatCliente />} />
      <Route path="/produtor/mensagens/:id" element={<MessageDetailScreen />} />
      <Route path="/produtor/perfil" element={<ProducerProfile />} />
    </Routes>
  );
}
