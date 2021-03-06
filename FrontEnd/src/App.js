import './App.css';
import { AuthProvider } from './Context'
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import { PrivateRoute, PrivateRoute3} from './Components';
import { PrivateRoute2 } from './ComponentsAdmin';
import { PrincipalClub, SelectGanadores, CampeonatosClub, LoginClub, NuevoCampeonato, SignUpClub, ForgotPassword, InscritosCamp } from './Pages'
import { PrincipalAdmin, AgregarClub , Perfil, LoginAdmin} from './PagesAdministrador'
import { PerfilJugador, CampeonatosJugador, LoginJugador, SignUpJugador, ForgotPassJug, BuscarCampeonato, InsCampeonato  } from './PagesPlayer';
import { Principal } from './PublicPages'




function App() {
  return (
    <AuthProvider>
      <div class = 'slider'>
        <div class ='load'/>
        <Router>
          <Routes>
            {/*Pagina Principal*/}
            <Route path = '/' element = {<Principal/>} />

            {/*Rutas para Club*/}
            <Route element = {<PrivateRoute/>}>
              <Route exact path = 'homeclub' element = {<PrincipalClub/>}/>
              <Route path = 'selectganadores' element = {<SelectGanadores/>}/>
              <Route path = 'campeonatosclub' element = {<CampeonatosClub/>}/>
              <Route path = 'nuevocampeonato' element = {<NuevoCampeonato/>}/>
              <Route path = 'principalclub' element = {<PrincipalClub/>}/>
              <Route path = 'inscritoscamp' element = {<InscritosCamp/>} />
            </Route>
            <Route path = 'loginClub' element = {<LoginClub/>}/>
            <Route path = 'signupclub' element = {<SignUpClub/>}/>
            <Route path = 'forgotpassword' element = {<ForgotPassword/>}/>

            {/*Rutas para admin*/}
            <Route element = {<PrivateRoute2/>}>
              <Route path = 'agregarClub' element = {<AgregarClub/>}/>
              <Route path = 'principalAdmin' element = {<PrincipalAdmin/>}/>
              <Route path = 'perfilAdmin' element = {<Perfil/>}/>
            </Route>
            <Route path = 'loginAdmin' element = {<LoginAdmin/>}/>
            
            {/*Rutas para Jugador*/}
            <Route element = {<PrivateRoute3/>}>
              <Route path = 'perfiljugador' element = {<PerfilJugador/>}/>
              <Route path = 'campeonatosjugador' element = {<CampeonatosJugador/>}/>
              <Route path = 'buscarcampeonato' element = {<BuscarCampeonato/>}/>
              <Route path = 'inscampeonato' element = {<InsCampeonato/>}/>
            </Route>
            <Route path = 'loginJugador' element = {<LoginJugador/>}/>
            <Route path = 'signupjugador' element = {<SignUpJugador/>}/>
            <Route path = 'forgotpassjug' element = {<ForgotPassJug/>}/>
          </Routes>
        </Router>
      </div>
      
    </AuthProvider>
    
  );
}

export default App;
