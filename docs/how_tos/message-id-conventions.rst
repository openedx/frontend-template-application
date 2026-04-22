######################
Message ID Conventions
######################

All user-facing text must be internationalized and referenced by message IDs.

Required pattern
****************

Use this naming convention for all message IDs:

``app.section.element.action``

Examples:

- ``app.example.page.heading.text``
- ``app.reference.page.primaryButton.label``

Implementation rules
********************

1. Define all user-facing messages with ``defineMessages``.
2. Render text with ``useIntl().formatMessage(...)`` or ``<FormattedMessage />``.
3. Do not hardcode UI strings in JSX.
4. Keep IDs stable after release to avoid translation churn.
5. Prefer feature-local ``messages.ts`` files to keep code modular.

Code reference
**************

See ``src/example/MessageIdReferencePage.tsx`` for the reference implementation.
