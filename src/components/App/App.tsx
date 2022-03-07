import "./App.scss";

import { EventDrawerProvider, EventsProvider } from "../../context";
import Main from "../Main";
import { Startup } from "../Startup";

function App() {
  return (
    <div className="App">
      <EventDrawerProvider open={false}>
        <EventsProvider events={[]}>
          <Startup>
            <Main />
          </Startup>
        </EventsProvider>
      </EventDrawerProvider>
    </div>
  );
}

export default App;
