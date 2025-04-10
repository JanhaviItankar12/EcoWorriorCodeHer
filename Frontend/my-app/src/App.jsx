import { Routes, Route } from "react-router-dom";
import './App.css'

//pages
import About from './pages/about'
import AdminPage from './pages/admin'
import PlayersDetailsPage from './pages/allteams'
import ForgotPassword from './pages/forgetpassword'
import GamesPage from './pages/games'
import HomePage from './pages/home'
import Login from './pages/login'
import Signup from "./pages/signup"
import ProfilePage from "./pages/UserProfile";

//component
import ProtectedRoute from "./component/protectRoute";
import ResetPassword from "./pages/resetPassword";
import Leaderboard from "./pages/leaderboard";
import AllUsers from "./pages/allUser";
import EditProfile from "./pages/editPro";


//games
import Game1 from "./Game/game1/game1";
import RecyclingGame from "./Game/game1/recyclingGame";
import AdminPlayers from "./pages/AdminPlayer";
import GamePage from "./pages/adminGamepage";
import GameCanvas from "./Game/game2/GameCanvas";
import TreePlantingGame from "./Game/game3/mainScene";
import RescueMission from "./Game/game4/gamePage";





function App() {


  return (
    <Routes>

       {/* for player */}
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={< Signup />} />
      <Route path="/login" element={< Login />} />
      <Route path="/forgot-password" element={< ForgotPassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin" element={< AdminPage />} />
      <Route path="/playerDetail" element={< PlayersDetailsPage />} />
      <Route path="/allUser" element={<AllUsers/>}/>
      <Route path="/leaderboard" element={<Leaderboard/>}/>

      
      {/* protected routes */}
      <Route path="/allGame/:userId" 
      element={
        <ProtectedRoute>
          < GamesPage /> 
        </ProtectedRoute>} />
        
      <Route path="/userProfile/:userId" 
      element={
        <ProtectedRoute>
        < ProfilePage /> 
      </ProtectedRoute>} />

      <Route path="/resetPassword/:token"
       element={
        <ProtectedRoute>
       <ResetPassword/>
       </ProtectedRoute>
       }/>

       <Route path="/edit/:userId"
       element={
       <ProtectedRoute>
       <EditProfile/>
       </ProtectedRoute>}/>

       {/* games */}

       {/* game1 */}
       
       <Route path="/recycling-Home/:userId" element={
        <ProtectedRoute>
         <Game1/>
        </ProtectedRoute>
        }/>
       
       
       
       <Route path="/recycling-game/:userId" element={
        <ProtectedRoute>
        <RecyclingGame/>
        </ProtectedRoute>
        }/>

        {/* game2 */}

        <Route path="/conserve-energy/:userId" element={
          <ProtectedRoute>
          <GameCanvas/>
          </ProtectedRoute>}/>

          {/* game3 */}
          <Route path="/treePlant/:userId" element={
              <ProtectedRoute>
              <TreePlantingGame/>
              </ProtectedRoute>}/>

         {/* game4 */}
         <Route path="/rescue/:userId" element={
              <ProtectedRoute>
             <RescueMission/>
              </ProtectedRoute>}/>
         
        


      {/* admin */}

      <Route path="/admin/:userId" element={ 
        <ProtectedRoute>
        <AdminPage/>
        </ProtectedRoute>}/>

     
        <Route path="/adminPlayers/:userId" element={
           <ProtectedRoute>
          <AdminPlayers/>
          </ProtectedRoute>
        }/>
         

        <Route path="/adminGame/:userId" element={ 
          <ProtectedRoute>
          <GamePage/>
          </ProtectedRoute>}/>







    </Routes>

  )
}

export default App;
