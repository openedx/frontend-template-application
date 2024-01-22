module.exports = {
  /*
  Modules you want to use from local source code.  Adding a module here means that when this app
  runs its build, it'll resolve the source from peer directories of this app.

  moduleName: the name you use to import code from the module.
  dir: The relative path to the module's source code.
  dist: The sub-directory of the source code where it puts its build artifact.  Often "dist".

  To use a module config:

  1. Copy module.config.js.example and remove the '.example' extension
  2. Uncomment modules below in the localModules array to load them from local source code.
  3. Remember to re-build the production builds of those local modules if they have one.
     See note below.
  */
  localModules: [
    /*********************************************************************************************
     IMPORTANT NOTE: If any of the below packages (like paragon or frontend-platform) have a build
     step that populates their 'dist' directories, you must manually run that step.  For paragon
     and frontend-platform, for instance, you need to run `npm run build` in the repo before
     module.config.js will work.
    **********************************************************************************************/

    // { moduleName: '@edx/brand', dir: '../brand-openedx' }, // replace with your brand checkout
    // { moduleName: '@openedx/paragon/scss/core', dir: '../paragon', dist: 'scss/core' },
    // { moduleName: '@openedx/paragon/icons', dir: '../paragon', dist: 'icons' },
    // { moduleName: '@openedx/paragon', dir: '../paragon', dist: 'dist' },
    // { moduleName: '@edx/frontend-platform', dir: '../frontend-platform', dist: 'dist' },
  ],
};
