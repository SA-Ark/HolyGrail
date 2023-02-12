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
import AvailableListings from "./components/ProfileComponents/PublicProfile/AvailableListings";
const { DeleteButton } = Buttons
const { ItemCreateForm, ItemEditForm } = Forms


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
            <AvailableListings/>
            <h1>_____________________________________</h1>

          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/items' exact={true} >
            <MainListingsPage />
          </Route>
          <Route path='/items' exact={true} >
            <MainListingsPage />
          </Route>
          <Route path='/items/create' exact={true}>
            <ItemCreateForm />
          </Route>
          <Route path='/items/edit/:itemId' exact={true}>
            <ItemEditForm />
          </Route>
          <Route path='/items/:itemId' exact={true} >
            <SingleItemPage />
          </Route>
          <Route path='/items/delete/:itemId' exact={true}>
            <DeleteButton />
          </Route>
          <Route path='/reviews/:userId'>
          </Route>
          <Route path='/reviews/create/:userId'>
          </Route>
          <Route path='/reviews/edit/:userId'>
          </Route>
          <Route path='/reviews/create/:userId'>
          </Route>
          <Route path='/' exact={true} >
            <h1>Splash Page</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
