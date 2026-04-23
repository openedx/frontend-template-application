frontend-template-application
#############################

|license-badge| |status-badge| |ci-badge| |codecov-badge|

⚠️ Warning ⚠️
***************

This template produces a `frontend-base`_ application: a library that plugs
into the Open edX frontend shell, rather than a standalone micro-frontend
bundled with its own webpack build. If you are looking for the legacy
standalone MFE template (pre-``frontend-base``), see `the master branch`_.

.. _frontend-base: https://github.com/openedx/frontend-base
.. _the master branch: https://github.com/openedx/frontend-template-application/tree/master

Purpose
*******

This repository is a template for Open edX frontend applications built on
``frontend-base``. It is flagged as a Template Repository, meaning it can be
used as a basis for new GitHub repositories by clicking the green "Use this
template" button above. The rest of this document describes how to work with
your new frontend application **after you've created a new repository from
the template.**

Getting Started
***************

After copying the template repository, you'll want to do a find-and-replace
to replace all instances of ``frontend-template-application`` with the name
of your new repository. You should also pick a new ``appId`` and role name
in ``src/constants.ts``, and a friendly title in ``public/index.html``.

Prerequisites
=============

`Tutor`_ is currently recommended as the development environment for your
new app. You can refer to the `relevant tutor-mfe documentation`_ to get
started using it.

.. _Tutor: https://github.com/overhangio/tutor

.. _relevant tutor-mfe documentation: https://github.com/overhangio/tutor-mfe#mfe-development

Cloning and Startup
===================

In the following steps, replace "[PLACEHOLDER]" with the name of the repo
you created when copying this template above.

1. Clone your new repo:

   ``git clone https://github.com/openedx/frontend-app-[PLACEHOLDER].git``

2. Use the version of Node specified in the ``.nvmrc`` file.

   Using other major versions of Node *may* work, but is unsupported. This
   repository includes an ``.nvmrc`` file to help set the correct Node
   version via `nvm <https://github.com/nvm-sh/nvm>`_.

3. Install npm dependencies:

   ``cd frontend-app-[PLACEHOLDER] && npm install``

4. (Optional) Update the port and public path used for local development by
   editing the ``dev`` script in ``package.json``. The default is
   ``PORT=8080 PUBLIC_PATH=/template``.

5. Start the dev server:

   ``npm run dev``

The dev server will be available at
`http://apps.local.openedx.io:8080 <http://apps.local.openedx.io:8080>`_
(or whatever port you configured), under the public path you configured.

Local Development Against frontend-base
=======================================

To develop your app and a local checkout of ``frontend-base`` in tandem, use
the built-in npm workspace support:

.. code-block:: sh

    mkdir -p packages/frontend-base
    sudo mount --bind /path/to/frontend-base packages/frontend-base
    npm install
    npm run dev:packages

Bind mounts are used instead of symlinks because Node resolves symlinks to
their real paths, which breaks hoisted dependency resolution. When you are
done, unmount with ``sudo umount packages/frontend-base``.

Making Your New Project's README File
=====================================

Move ``README-template-frontend-app.rst`` to your project's ``README.rst``
file. Please fill out all the sections - this helps other developers
understand your app, how to install it, and how to use it.

Developing
**********

This section concerns development of ``frontend-template-application``
itself, not the templated copy.

One of the goals of this repository is for it to function correctly as a
frontend-base application (``npm install && npm run dev``) even if no
modifications are made. This ensures that developers get a *practical*
working example, not just a theoretical one.

This also means, of course, that any committed code should be tested and
subject to both CI and branch protection rules.

Project Structure
=================

The layout follows the standard `frontend-base app layout`_:

- ``src/app.ts`` - the app configuration imported by ``site.config.*.tsx``
- ``src/constants.ts`` - the app's ``appId`` and role identifiers
- ``src/index.ts`` - the package's public exports (this is a library)
- ``src/routes.tsx`` - the app's react-router routes
- ``src/Main.tsx`` - the root component for the app's routes
- ``src/slots.tsx`` - the slot operations the app applies to the shell
- ``src/slots/`` - the slots this app offers to consumers
- ``src/style.scss`` - app-scoped runtime styles

For more, see the `frontend-base migration how-to`_.

.. _frontend-base app layout: https://github.com/openedx/frontend-base/blob/main/docs/how_tos/migrate-frontend-app.md#src-file-structure
.. _frontend-base migration how-to: https://github.com/openedx/frontend-base/blob/main/docs/how_tos/migrate-frontend-app.md

Build Process Notes
===================

**Library build**

``npm run build`` compiles the library into ``dist/`` via ``tsc`` and
``tsc-alias``. This is what gets published and consumed by sites.

**CI build**

``npm run build:ci`` runs ``openedx build`` against ``site.config.ci.tsx``
so webpack traverses the full app graph. This catches issues (like broken
lazy-loaded imports) that ``tsc`` and Jest would not surface.

Internationalization
====================

Please refer to the `frontend-base i18n howto`_ for documentation on
internationalization.

.. _frontend-base i18n howto: https://github.com/openedx/frontend-base/blob/main/docs/how_tos/i18n.rst

Getting Help
************

If you're having trouble, we have discussion forums at
https://discuss.openedx.org where you can connect with others in the
community.

Our real-time conversations are on Slack. You can request a `Slack
invitation`_, then join our `community Slack workspace`_. Because this is a
frontend repository, the best place to discuss it would be in the
`#wg-frontend channel`_.

For anything non-trivial, the best path is to open an issue in this
repository with as many details about the issue you are facing as you can
provide.

https://github.com/openedx/frontend-template-application/issues

For more information about these options, see the `Getting Help`_ page.

.. _Slack invitation: https://openedx.org/slack
.. _community Slack workspace: https://openedx.slack.com/
.. _#wg-frontend channel: https://openedx.slack.com/archives/C04BM6YC7A6
.. _Getting Help: https://openedx.org/getting-help

License
*******

The code in this repository is licensed under the AGPLv3 unless otherwise
noted.

Please see `LICENSE <LICENSE>`_ for details.

Contributing
************

Contributions are very welcome. Please read `How To Contribute`_ for details.

.. _How To Contribute: https://openedx.org/r/how-to-contribute

This project is currently accepting all types of contributions, bug fixes,
security fixes, maintenance work, or new features. However, please make
sure to have a discussion about your new feature idea with the maintainers
prior to beginning development to maximize the chances of your change being
accepted. You can start a conversation by creating a new issue on this repo
summarizing your idea.

The Open edX Code of Conduct
****************************

All community members are expected to follow the `Open edX Code of
Conduct`_.

.. _Open edX Code of Conduct: https://openedx.org/code-of-conduct/

People
******

The assigned maintainers for this component and other project details may
be found in `Backstage`_. Backstage pulls this data from the
``catalog-info.yaml`` file in this repo.

.. _Backstage: https://open-edx-backstage.herokuapp.com/catalog/default/component/frontend-template-application

Reporting Security Issues
*************************

Please do not report security issues in public, and email
security@openedx.org instead.

.. |license-badge| image:: https://img.shields.io/github/license/openedx/frontend-template-application.svg
    :target: https://github.com/openedx/frontend-template-application/blob/main/LICENSE
    :alt: License

.. |status-badge| image:: https://img.shields.io/badge/Status-Maintained-brightgreen

.. |ci-badge| image:: https://github.com/openedx/frontend-template-application/actions/workflows/ci.yml/badge.svg
    :target: https://github.com/openedx/frontend-template-application/actions/workflows/ci.yml
    :alt: Continuous Integration

.. |codecov-badge| image:: https://codecov.io/github/openedx/frontend-template-application/coverage.svg?branch=main
    :target: https://codecov.io/github/openedx/frontend-template-application?branch=main
    :alt: Codecov
