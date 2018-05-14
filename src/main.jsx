import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Home, About, Topics } from './routes/Home.route'
import { HomeView } from './views/Home.component';

/*
Allow passing props to <Route> to be passed down to the component it renders
https://github.com/ReactTraining/react-router/issues/5521
https://tylermcginnis.com/react-router-pass-props-to-components/
The simplest solution is just to use render instead:

<Route path="/abc" render={()=><TestWidget num="2" someProp={100}/>}/>
*/
ReactDOM.render(
    <Router>
        <React.Fragment>
            <Route exact path="/" component={HomeView} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
        </React.Fragment>
    </Router>
    ,
    document.getElementById('app')
);
