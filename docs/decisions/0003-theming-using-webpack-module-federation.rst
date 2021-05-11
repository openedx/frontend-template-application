Runtime Theming Using WebPack Module Federation
=============================================

Status
------

Proposal

Context
-------

Webpack 5 introduced a new feature called "Module Federation" which allows
sharing components between multiple frontend applications. For instance, this
mechanism would allow a component/page/view available in one MFE to be used by
another MFE without needing the source code to be shared between the MFEs.

Module Federation instead allows you to expose certain parts of your app as
sharable, in which case they are compiled into a separate sharable module that
can be loaded by another app. This means that if the component is updated in
one MFE, other MFEs that use it will automatically load the latest deployed
version of that code.

This opens up a  world of opportunities for MFEs. What this ADR looks at in
particular is using module federation for theming.

Currently, all MFEs roughly use the same common theme SCSS files, but add some
small bits of SCSS on top for their own custom components. With some small bit
of restructuring, we can extract all the common theming code into it's own
overridable module. This module can then be shared between all MFEs and provided
from one central place. Any change in the theme here will then automatically
propagate to all MFEs.

Additionally, by adding a backend to generate such themes we can also make the
theme dynamic. This would enable things like: per-user themes, day-night themes,
multiple user-selectable themes, etc.

The goal of this ADR, however, is limited to providing a centralised theme that
can be rebuilt without rebuilding all MFEs.

Decision
--------

All MFEs currently have all their SCSS code conveniently loaded in a single
``index.scss`` file. This contains many common imports across all MFEs, such
as brand import, paragon imports etc. We can move all these common imports into
a separate overridable theme module.

The overridable theme module will be loaded from a common theming MFE that will
expose the common theme code. To change the theme, one can rebuild the theme
in that MFE, and redeploy it. Since all MFEs will load the theme from there they
will all get the latest theme code.

Each MFE will continue coming with its own local theme module that is compiled
with the MFE, allowing the current mechanisms of theming to continue working as
they do now.

Technical Details
-----------------

As the module federation feature is currently only available in Webpack 5.
The first step is to upgrade ``frontend-build`` to use the latest Webpack 5
release.

Additionally, ``frontend-build`` can also automatically include the Webpack
config to mark the theme as sharable, meanwhile ``frontend-platform`` can
include the common code for the theme, so it doesn't need to be included in each
MFE.

To allow each MFE to have its own SCSS that's loaded, and to have control over
the order, the parts of the theme to be loaded before the regular theme and
after it can be specified during app initialization.

Let us for example look at the ``index.scss`` file of ``frontend-app-account``.
In this file we have an `initial segment that is common across all MFEs`_ and
`the rest`_ is code specific to the MFE. The initial segment will now move to
``frontend-platform``.

The ``frontend-platform`` code will attempt to load the dynamic theme and fall
back to the standard theme, and also load the custom scss from the app.

.. _initial segment that is common across all MFEs: https://github.com/edx/frontend-app-account/blob/e2f9edd62317de2d762e87f7f68d58b31aab3497/src/index.scss#L1-L9
.. _the rest: https://github.com/edx/frontend-app-account/blob/e2f9edd62317de2d762e87f7f68d58b31aab3497/src/index.scss#L11-L64

During compilation all MFEs will now support a ``THEME_URL``. If provided this
is where the theme will be loaded from dynamically by ``frontend-platform``.

To avoid a flash of  content without styling, ``frontend-platform`` can add a lifecycle
phase for theming that will block triggering the ``APP_READY`` signal till the
theme is loaded.

Consequences
------------

The theme will no longer be included as a standard SCSS file that's included in
the base html file for the MFE, instead it will be loaded dynamically from the
configured theme MFE URL.

Since the theme is now loaded from an external source and uses a standard
Webpack pluggable format, third parties can build any mechanism they like for
updating this link with new theme as long as it follows the format Webpack
expects for modules.

One downside of this mechanism is that since the theme is no longer built as
part of each MFE, there is no way currently, to use Paragon/bootstrap variables
in custom SCSS used by an MFE.

For example, `this usage of $grid-breakpoints`_ in an MFE component's style will
no longer work. While it will be possible for the file to compile. It will no
longer respect changes to that variable in the base theme, since that will only
work during SCSS compilation.

The solution for the above is to avoid using such variables in custom scss
and instead rely on Bootstrap/Paragon classes to apply the desired styling.
For example, in `this usage of theme colours`_ to create a border, the component
can instead use ``border-top border-warning``. While it's currently not possible
to specify a border size, Bootstrap 5 rectifies this. For cases where an exact
style isn't available, it can be added as an extension to Paragon.

.. _this usage of $grid-breakpoints: https://github.com/edx/frontend-app-account/blob/e2f9edd62317de2d762e87f7f68d58b31aab3497/src/account-settings/_style.scss#L18
.. _this usage of theme colours: https://github.com/edx/frontend-app-account/blob/e2f9edd62317de2d762e87f7f68d58b31aab3497/src/id-verification/_id-verification.scss#L7

References
----------

* `Webpack Module Federation <https://webpack.js.org/concepts/module-federation/>`_
