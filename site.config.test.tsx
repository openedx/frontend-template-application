import { EnvironmentTypes, SiteConfig } from '@openedx/frontend-base';

const siteConfig: SiteConfig = {
  siteId: 'frontend-template-test-site',
  siteName: 'Frontend Template Test Site',
  baseUrl: 'http://localhost:8080',
  lmsBaseUrl: 'http://localhost:8000',
  loginUrl: 'http://localhost:8000/login',
  logoutUrl: 'http://localhost:8000/logout',

  environment: EnvironmentTypes.TEST,
  basename: '/frontend-template',
  apps: [{
    appId: 'org.openedx.frontend.app.frontendTemplate',
    config: {}
  }],
};

export default siteConfig;
