import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainNavigation from './components/layout/MainNavigation';
import AllQuotes from './pages/AllQuotes';

import layoutClasses from './components/layout/Layout.module.css';
import NotFound from './pages/NotFound';
import  LoadingSpinner from './components/UI/LoadingSpinner';


const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));

function App() {
  return (
    <>
      <MainNavigation />
      <main className={layoutClasses.main}>
        <Suspense fallback={<div className='centered'><LoadingSpinner/></div>}>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/quotes" />
            </Route>
            <Route path="/quotes" exact>
              <AllQuotes />
            </Route>
            <Route path="/quotes/:quoteId">
              <QuoteDetail />
            </Route>
            <Route path="/new-quote">
              <NewQuote />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </main>
    </>
  );
}

export default App;
