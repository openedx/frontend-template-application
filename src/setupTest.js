/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';

import { App } from '@edx/frontend-base';
import { configure as configureI18n } from '@edx/frontend-i18n';

import messages from './i18n';

configureI18n(App.config, messages);
