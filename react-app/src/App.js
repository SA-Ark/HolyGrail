import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import MainListingsPage from "./components/ItemsDisplayComponents/MainListingsPage";
import ItemCreateForm from './components/Forms/ItemCreateForm'
import ItemEditForm from "./components/Forms/ItemEditForm";
import SingleItemPage from './components/ItemsDisplayComponents/SingleItemPage'
import DeleteButton from './components/Buttons/DeleteButton'


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
          <Route path='/' exact={true} >
            <h1>Splash Page</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
