import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import {withRouter,Redirect} from "react-router";
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducers, middlewares} from './redux-store';
import List from "./redux-components/List";
import IssueCard from "./views/IssueCard"
import SearchBox from "./views/SearchBox"
import IssueDetail from "./views/IssueDetail"

const initialState = {};

const store = createStore(combineReducers({...reducers}), initialState, applyMiddleware(...middlewares));

class ReduxApp extends Component {
    render() {
        const {location:{pathname,state}} = this.props;
        return <div className="App">
            {pathname=== "/" ? <List
                renderHeader={props => <SearchBox {...props}/>}
                itemsPerRow={3}
                gridStyle={{item: {margin: 20}}}
                renderItem={(row,props )=> <IssueCard row={row} {...props}/>}
            />:pathname=== "/issueDetail"?<IssueDetail pathname={pathname} state={state}  />:
                <Redirect to="/" />}
        </div>
    }
}
ReduxApp = withRouter(ReduxApp);


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Route exact path="/" component={ReduxApp}/>
                        <Route exact path="/issueDetail" component={ReduxApp}/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

