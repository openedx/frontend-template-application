frontend-app-[PLACEHOLDER]
##########################

.. note::

  This README is a template.  As a maintainer, please review its contents and
  update all relevant sections. Instructions to you are marked with
  "[PLACEHOLDER]" or "[TODO]". Update or remove those sections, and remove this
  note when you are done.

|license-badge| |status-badge| |ci-badge| |codecov-badge|

.. |license-badge| image:: https://img.shields.io/github/license/openedx/frontend-app-[PLACEHOLDER].svg
    :target: https://github.com/openedx/frontend-app-[PLACEHOLDER]/blob/main/LICENSE
    :alt: License

.. |status-badge| image:: https://img.shields.io/badge/Status-Maintained-brightgreen

.. |ci-badge| image:: https://github.com/openedx/frontend-app-[PLACEHOLDER]/actions/workflows/ci.yml/badge.svg
    :target: https://github.com/openedx/frontend-app-[PLACEHOLDER]/actions/workflows/ci.yml
    :alt: Continuous Integration

.. |codecov-badge| image:: https://codecov.io/github/openedx/frontend-app-[PLACEHOLDER]/coverage.svg?branch=main
    :target: https://codecov.io/github/openedx/frontend-app[PLACEHOLDER]?branch=main
    :alt: Codecov

Purpose
=======

.. note::

   [TODO]

   What is this MFE?  Add a 2-3 sentence description of what it is and what it
   does.

This is the Awesome MFE.  It was built to provide an unmatched learning
experience, with improved tools for both randomized goodness and the ability to
directly reference amaze-blocks in existing courses. This experience is powered
by the new Fantastico storage engine.

Getting Started
===============

Prerequisites
=============

The Tutor_ platform is a prerequisite for developing an MFE.
Utilize `relevant tutor-mfe documentation`_ to guide you through
the process of MFE development within the Tutor environment.

.. _Tutor: https://github.com/overhangio/tutor

.. _relevant tutor-mfe documentation: https://github.com/overhangio/tutor-mfe#mfe-development

.. note::

   [TODO]

   Describe in detail how this MFE can be installed and set up for development
   with tutor.  Include as many screenshots as you can to make your guide
   easier to follow!  Use the following steps as an example:

Configuration
-------------

.. note::

   [TODO]

   Explicitly list anything that this MFE requires to function correctly.  This includes:

   * A list of both required and optional .env variables, and how they each
     affect the functioning of the MFE

   * A list of edx-platform `feature and waffle flags`_ that are either required
     to enable use of this MFE, or affect the behavior of the MFE in some other
     way

   * A list of IDAs or other MFEs that this MFE depends on to function correctly

.. _feature and waffle flags: https://docs.openedx.org/projects/openedx-proposals/en/latest/best-practices/oep-0017-bp-feature-toggles.html

Plugins
=======
This MFE can be customized using `Frontend Plugin Framework <https://github.com/openedx/frontend-plugin-framework>`_.

The parts of this MFE that can be customized in that manner are documented `here </src/plugin-slots>`_.

[PLACEHOLDER: Other Relevant Sections]
======================================

.. note::

   [TODO]

   This is optional, but you might have additional sections you wish to cover.
   For instance, architecture documentation, i18n notes, build process, or
   more.

Known Issues
============

.. note::

   [TODO]

   If there are long-standing known issues, list them here as a bulletted list,
   linking to the actual issues in the Github repository.

Development Roadmap
===================

.. note::

   [TODO]

   Include a list of current development targets, in (rough) descending order
   of priority.  It can be a simple bulleted list of roadmap items with links
   to Github issues or wiki pages.

Getting Help
============

.. note::

   [TODO]

   Use the following as a template, but feel free to add specific places where
   this MFE is commonly discussed.

If you're having trouble, we have discussion forums at
https://discuss.openedx.org where you can connect with others in the community.

Our real-time conversations are on Slack. You can request a `Slack
invitation`_, then join our `community Slack workspace`_.  Because this is a
frontend repository, the best place to discuss it would be in the `#wg-frontend
channel`_.

For anything non-trivial, the best path is to open an issue in this repository
with as many details about the issue you are facing as you can provide.

https://github.com/openedx/frontend-app-[PLACEHOLDER]/issues

For more information about these options, see the `Getting Help`_ page.

.. _Slack invitation: https://openedx.org/slack
.. _community Slack workspace: https://openedx.slack.com/
.. _#wg-frontend channel: https://openedx.slack.com/archives/C04BM6YC7A6
.. _Getting Help: https://openedx.org/getting-help

License
=======

The code in this repository is licensed under the AGPLv3 unless otherwise
noted.

Please see `LICENSE <LICENSE>`_ for details.

Contributing
============

.. note::

   [TODO]

   Feel free to add contribution details specific to your repository.

Contributions are very welcome.  Please read `How To Contribute`_ for details.

.. _How To Contribute: https://openedx.org/r/how-to-contribute

This project is currently accepting all types of contributions, bug fixes,
security fixes, maintenance work, or new features.  However, please make sure
to have a discussion about your new feature idea with the maintainers prior to
beginning development to maximize the chances of your change being accepted.
You can start a conversation by creating a new issue on this repo summarizing
your idea.

The Open edX Code of Conduct
============================

All community members are expected to follow the `Open edX Code of Conduct`_.

.. _Open edX Code of Conduct: https://openedx.org/code-of-conduct/

People
======

The assigned maintainers for this component and other project details may be
found in `Backstage`_. Backstage pulls this data from the ``catalog-info.yaml``
file in this repo.

.. _Backstage: https://open-edx-backstage.herokuapp.com/catalog/default/component/frontend-app-[PLACEHOLDER]

Reporting Security Issues
=========================

Please do not report security issues in public.  Email security@openedx.org instead.
