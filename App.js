import React from "react";
import Navigators from "./src/navigators";
import { Provider } from "react-redux";
import store from "./src/store/store";

const App = () => {
    return (
      <Provider store={store}>
        <Navigators />
      </Provider>
    );
  };
  
  export default App;
