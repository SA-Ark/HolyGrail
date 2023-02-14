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
import MainDashboard from './components/ProfileComponents/UserDashboard/MainDashboard'
import SplashPlage from "./components/SplashPage/HomePage/HomePage";
import ItemCreateModal from "./components/Forms/ItemCreateModal";
import EditReviewForm from "./components/Forms/EditReviewForm";


const { DeleteButton } = Buttons
const { ItemEditForm, ReviewForm, EditProfileForm } = Forms

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
          <Route path="/component-test/:userId">
            <h1>Component Tester</h1>
            <MainDashboard/>
            {/* <h2>_____________________________________</h2> */}
            {/* <h2>_____________________________________</h2> */}
            {/* <h2>_____________________________________</h2> */}
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <ProtectedRoute path='/items/edit/:itemId'>
            <ItemEditForm />
          </ProtectedRoute>
          <ProtectedRoute path='/items/delete/:itemId'>
            <DeleteButton />
          </ProtectedRoute>
          <ProtectedRoute path='/items/current' exact={true} >
            <MainListingsPage />
          </ProtectedRoute>
          <Route path='/items/:itemId' >
            <SingleItemPage />
          </Route>
          <ProtectedRoute path='/items/:itemId' >
            <SingleItemPage />
          </ProtectedRoute>
          <Route path='/items' exact={true} >
            <MainListingsPage />
          </Route>
          <Route path="/dashboard/:userId">
            <MainDashboard/>
          </Route>
          <ProtectedRoute path='/reviews/edit/:reviewId' exact={true}>
            <EditReviewForm />
          </ProtectedRoute>
          <ProtectedRoute path='/reviews/delete/:reviewId'>
          </ProtectedRoute>
          <ProtectedRoute path='/reviews/create/:itemId'>
            <ReviewForm/>
          </ProtectedRoute>
          <Route path='/' exact={true} >
            <SplashPlage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
