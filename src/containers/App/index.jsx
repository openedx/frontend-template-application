import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import CoursewarePage from '../CoursewarePage';
import HomePage from '../HomePage';
import FAQSupportPage from '../FAQSupportPage';
import NotFoundPage from '../NotFoundPage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './App.scss';

export default function App() {
  return (
    <div>
      <Helmet
        titleTemplate="%s - edX Portal"
        defaultTitle="edX Portal"
      />
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/courses/:courseId" component={CoursewarePage} />
        <Route path="/faq" component={FAQSupportPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}
