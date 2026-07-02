frontend-app-searn-administrator
#################################

|license-badge| |status-badge|

Purpose
*******

``frontend-app-searn-administrator`` is the **administrator portal** micro-frontend
for the **SEARN** platform, a customized Open edX deployment used for
regulatory and competency training by health authorities. It is built with
`frontend-platform`_ and is served, authenticated, under the ``/admin`` route
prefix (see ``src/App.jsx``).

Unlike the public marketing site, this MFE is a single, role-aware
application shared by every kind of back-office user on the platform:

* **Secretariat** — SEARN staff who administer the whole
  platform: competency frameworks, NRAs, training providers, countries,
  roles, and reporting.
* **Training Provider** users — manage their own training catalog, team,
  and organization profile.
* **NRA (National Regulatory Authority)** users — ``NRA Admin``,
  ``NRA Manager``, and ``NRA Staff`` — manage their team, review the
  regulatory passport, and consume NRA-specific training catalogs,
  each with a narrower slice of permissions than the role above it.

What any given user can *see* (sidebar/routes) and *do* (buttons, columns,
modals) is driven entirely by the permission payload returned for their
role — this is not a hard-coded, role-name ``if`` statement scattered
through the UI.

Key Modules
===========

* **Dashboard** — role-specific summary cards (top trainings, recent
  activity, pending requests, quick actions, users per country, etc.)
* **Competency Frameworks** — build/view/edit competency frameworks across
  "Who", "SEARN", and "NRA" tabs, including a suggestions workflow.
* **Activities Management** — manage the activity catalog frameworks are
  built from.
* **Training Catalogs** — three related but distinct catalogs:
  SEARN Training Catalog (global), My Training Catalog (a provider's own
  offerings), and NRA-Specific Training Catalog.
* **NRAs Management / Training Providers / Countries** — SEARN-side
  onboarding and maintenance of regulatory authorities, training
  providers, and the supported country list.
* **Users / My Team** — user directory and management, including
  per-user assigned trainings and the Regulatory Passport.
* **Organization Profile** — a Training Provider's or NRA's own org
  profile and administrator list.
* **Roles** — manage the custom RBAC roles available on the platform.
* **Pending Requests / Requested Trainings** — onboarding request review
  and demand-signal tracking for trainings.
* **Profile / Settings** — the signed-in user's own profile and app
  settings.
* **Reports** — staff trained, training offers, competency coverage, and
  related reports (currently placeholder pages pending backend support).

Getting Started
****************

Prerequisites
==============

`Tutor`_ is the recommended development environment. This MFE always
requires an LMS to authenticate against and a custom-extensions 
backend to serve the ``/api/v1/...`` endpoints it calls — it has no
meaningful standalone/anonymous mode.

.. _Tutor: https://github.com/overhangio/tutor


Installation
============

The following Tutor plugin code can be used to install and configure this
MFE in a Tutor environment.

.. code-block:: python

    from tutormfe.hooks import MFE_APPS
    from tutor import hooks

    @MFE_APPS.add()
    def _add_searn_administrator_mfe(mfes):
        mfes["searn-administrator"] = {
            "repository": "https://github.com/TitanEd/frontend-app-searn-administrator.git",
            "port": 2025,
            "version": "master",
        }
        return mfes
    searn_amdin_mfe_url = """
    SEARN_ADMINISTRATOR_MICROFRONTEND_URL = "https://{{ MFE_HOST }}/searn-administrator"
    """

    searn_amdin_mfe_url_dev = """
    SEARN_ADMINISTRATOR_MICROFRONTEND_URL = "http://{{ MFE_HOST }}:2025/searn-administrator"
    """

    env_items = [
        (
            "openedx-common-settings",
            searn_amdin_mfe_url,
        ),
        (
            "openedx-lms-development-settings",
            searn_amdin_mfe_url_dev,
        ),
    ]

    for item in env_items:
        hooks.Filters.ENV_PATCHES.add_item(item)


Getting Help
*************

For issues specific to SEARN customizations, open an issue against this
repository: https://github.com/TitanEd/frontend-app-searn-administrator/issues

For general Open edX / frontend-platform questions, the community discussion
forums at https://discuss.openedx.org and the ``#wg-frontend`` Slack channel
are good starting points.

License
*******

The code in this repository is licensed under the AGPLv3 unless otherwise
noted.

Please see `LICENSE <LICENSE>`_ for details.

.. |license-badge| image:: https://img.shields.io/github/license/TitanEd/frontend-app-searn-administrator.svg
    :target: https://github.com/TitanEd/frontend-app-searn-administrator/blob/master/LICENSE
    :alt: License

.. |status-badge| image:: https://img.shields.io/badge/Status-Maintained-brightgreen
