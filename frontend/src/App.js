import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import GroupIndex from './components/Groups'
import EventIndex from "./components/Events";
import GroupInfo from "./components/Groups/GroupInfo";
import EventInfo from "./components/Events/EventInfo";
import HomePage from "./components/HomePage";
import GroupForm from "./components/Groups/GroupForm";
import EventForm from "./components/Events/EventForm";
import GroupUpdate from "./components/Groups/GroupUpdate";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
          <Route path='/groups/new' component={GroupForm} />
          <Route path='/groups/update' component={GroupUpdate} />
          <Route path='/groups/:groupId' component={GroupInfo} />
          <Route path='/groups' component={GroupIndex} />
          <Route path='/events/new' component={EventForm} />
          <Route path='/events/:eventId' component={EventInfo} />
          <Route path='/events' component={EventIndex} />
          <Route exact path='/' component={HomePage} />
        </Switch>}
    </>
  );
}

export default App;
