// Basic
import { Component } from "react";

// Router
import {
  Router,
  Route,
  Switch
} from "react-router-dom";

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Pages
import Main from "./pages/main";
import history from "./utils/history";
import Upload from "./pages/upload";
import Nft from "./pages/nft";
import Artist from "./pages/artist";
import Gallery from "./pages/gallery";
import Order from "./pages/order";
import Privacy from "./pages/privacy";
import Terms from "./pages/terms";
import OrderRev from "./pages/order-review";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/order" component={Order} />
            <Route exact path="/upload" component={Upload} />
            <Route exact path="/marketplace" component={Gallery} />
            <Route exact path="/nft/:pub" component={Nft} />
            <Route exact path="/artist/:pub" component={Artist} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/order-review" component={OrderRev} />
            <Route path="*" component={Main} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
