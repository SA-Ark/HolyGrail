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
import MainDashboard from './components/ProfileComponents/UserDashboard/MainDashboard'
import SplashPlage from "./components/SplashPage/HomePage/HomePage";
import ItemCreateModal from "./components/Forms/ItemCreateModal";
import EditReviewForm from "./components/Forms/EditReviewForm";

//Temporary components imports for testing go here:
import AvailableListings from "./components/ProfileComponents/PublicProfile/AvailableListings";
import Tabs from "./components/ProfileComponents/UserDashboard/Tabs";
const { AddressesTab, MessagesTab, NotificationsTab, PurchasesTab, EditProfileTab, SizesTab } = Tabs

// End of temporary components

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
          <Route path='/items' exact={true} >
            <MainListingsPage />
          </Route>
          <ProtectedRoute path='/items' exact={true} >
            <MainListingsPage />
          </ProtectedRoute>
          <ProtectedRoute path='/items/create' exact={true}>
            <ItemCreateModal />
          </ProtectedRoute>
          <Route path='/items/:itemId' >
            <SingleItemPage />
          </Route>
          <ProtectedRoute path='/items/:itemId' >
            <SingleItemPage />
          </ProtectedRoute>
          <ProtectedRoute path='/items/edit/:itemId'>
            <ItemEditForm />
          </ProtectedRoute>
          <ProtectedRoute path='/items/delete/:itemId'>
            <DeleteButton />
          </ProtectedRoute>
          <Route path='/users/profile/:userId'>
            <PublicProfile />
          </Route>
          {/* !@#$ misc need to add conditional logic somewhere to only render if
          the dashboard belongs to current user  */}
          <Route path="/dashboard/:userId">
            <MainDashboard/>
            {/* <PurchasesTab/> */}
          </Route>
          {/* <Route path='/reviews/:userId'>
          </Route> */}
          <ProtectedRoute path='/reviews/delete/:reviewId'>
          </ProtectedRoute>
          <ProtectedRoute path='/reviews/create/:itemId'>
            <ReviewForm/>
          </ProtectedRoute>
          <ProtectedRoute path='/reviews/edit/:reviewId' exact={true}>
            <EditReviewForm />
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
