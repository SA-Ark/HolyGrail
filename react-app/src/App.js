import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import MainListingsPage from "./components/ItemsDisplayComponents/MainListingsPage";
import Forms from './components/Forms'
import SingleItemPage from './components/ItemsDisplayComponents/SingleItemPage'
import Buttons from './components/Buttons'
import PublicProfile from './components/ProfileComponents/PublicProfile'
import UserDashboard from './components/ProfileComponents/UserDashboard/MainDashboard'
//Temporary components imports for testing go here:
import AvailableListings from "./components/ProfileComponents/PublicProfile/AvailableListings";
import SplashPlage from "./components/SplashPage/HomePage/HomePage";


const { DeleteButton } = Buttons
const { ItemCreateForm, ItemEditForm, ReviewForm } = Forms


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/component-test">
            <h1>Component Tester</h1>
            <PublicProfile/>
            <h2>_____________________________________</h2>
            <UserDashboard/>
            <h2>_____________________________________</h2>
            <ReviewForm/>
            <h2>_____________________________________</h2>

          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <ProtectedRoute path='/items' exact={true} >
            <MainListingsPage />
          </ProtectedRoute>
          <Route path='/items' exact={true} >
            <MainListingsPage />
          </Route>
          <ProtectedRoute path='/items/create' exact={true}>
            <ItemCreateForm />
          </ProtectedRoute>
          <ProtectedRoute path='/items/edit/:itemId' exact={true}>
            <ItemEditForm />
          </ProtectedRoute>
          <Route path='/items/:itemId' exact={true} >
            <SingleItemPage />
          </Route>
          <ProtectedRoute path='/items/delete/:itemId' exact={true}>
            <DeleteButton />
          </ProtectedRoute>
          <Route path='/reviews/:userId'>

          </Route>
          <Route path='/reviews/create/:userId'>
          </Route>
          <Route path='/reviews/edit/:userId'>
          </Route>
          <Route path='/reviews/create/:userId'>
          </Route>
          <Route path='/' exact={true} >
            <SplashPlage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
