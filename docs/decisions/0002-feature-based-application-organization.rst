1. Feature-based Application Organization
--------------------------------

Status
------

Proposed

Context
-------

The common, naive approach to organizing React/Redux applications says that code should be grouped into folders by type, putting like-types of code together. This means having directories like:

- components
- actions
- reducers
- constants
- selectors
- sagas
- services

This is often referred to as a "Ruby on Rails" approach, which organizes applications similarly.

As applications grow, it's acknowledged by the community that this organization starts to fall down and become difficult to maintain. It does nothing to help engineers keep their code modular and decoupled, as it groups code by how it looks and not how it's used. Code that functions as part of a unit is spread out over 7+ directories.

This ADR documents an approach and rules of thumb for organizing code modularly by feature, informed by articles, prior art.

Decision
--------

**Following the spirit of these principles is more important than following them to the letter.**

These rules are guidelines. It won't always be reasonable or necessary to follow them to the letter. They provide a set of tools for dealing with complexity. It follows, then, that if you don't have complexity, then you may not need the tools.

Primary guiding principles
==========================

**1. Code is organized into feature directories.**

A feature is a logical or semantically significant grouping of code; what comprises a feature is subjective.  It's also emergent - if code tends to be related or change together, then it's probably part of the same feature.

It's unlikely to be worth agonizing over your feature breakdown; time will tell what's correct moreso than overthinking it. That said, a sufficiently complex set of features will need a similarly robust taxonomy and organizational hierarchy. (This document endeavors to help inform that hierarchy.)  A nice rule of thumb is that a feature should conceptually be able to be extracted into its own npm package with minimal effort.

**2. Create strict module boundaries**

A feature should have a public interface exposed via an index.js file in the feature directory.  Consumers of a feature should limit themselves to importing only from the public exports.

Modules are configured from above. For react components, this is giving them props, for services, this is giving it apiClient/configuration, etc.

**3. Avoid circular dependencies**

Circular dependencies are unresolvable in webpack, and will result in something being imported as 'undefined'.  They're also incredibly difficult and frustrating to track down.  Properly factoring your features and supporting modules should help avoid these sorts of issues.  In general, a feature should never need to import from its parent, or from its lineage (grandparents, great-grandparents, etc.).  Furthermore, think about how "general purpose" a given feature or module is.  If you find yourself importing from a domain-specific feature in your general utility module, then something is probably ill-factored.

Secondary principles
====================

**A. Separate business logic from components**

In order to isolate our view layer (react) from business logic inherent in our global state, APIs, and side effect management, we want to adopt the "ducks" organization (see references).  This involves isolating business logic into a
sub directory of a feature.  See "B" below for an example.

**B. Files in a feature directory are named by type of code**

Since directory names describe features, file names describe types of code.

::

  /profile
    /index.js // public interface
    /ProfilePage.jsx // view
    /ProfilePhotoUploader.jsx // supporting view
    /ducks // business logic
      /actions.js
      /reducers.js
      /selectors.js

Within the ducks directory, if multiple files of a type are necessary, first consider whether there is really a sub-feature here that should be defined.  If no discernable sub-feature is emerging, then turn the file (e.g., reducers.js) into a directory (reducers/)
and put multiple files in it, named by what the reducer does (reducers/AccountReducer.js).  The directory can then have an index.js file which documents the reducers that can be imported.  Consider again whether there's really a sub-feature here.

Multiple components and reducers:

::

  /profile
    /index.js // public interface
    /ProfilePage.jsx
    /ProfilePhotoUploader.jsx
    /Avatar.jsx
    /ducks
      /actions.js
      /reducers
        /index.js
        /FormReducers.js
        /ProfilePhotoReducers.js
      /selectors.js

As a sub component:

::

  /profile
    /index.js // public interface
    /ProfilePage.jsx
    /ducks
      /actions.js
      /reducers.js
      /selectors.js
    /profile-photo
      /index.js
      /ProfilePhoto.jsx
      /ducks
        /actions.js
        /reducers.js
        /selectors.js
    /education // Sparse sub-feature example
      /index.js
      /Education.jsx

There may be other files in the /ducks directories as necessary.  e.g., sagas.js, operations.js, services.js, etc.

**C. Features can have sub-features.**

Sub-features should follow the same rules as any other feature.

**D. A feature may import from outside its ancestry.**

As described above in "Avoid Circular Dependencies", features should not import from their parent, grandparent, etc.  That said, they can import from siblings of their lineage.

**E. A feature may not import from the children of its siblings.**

If a feature needs something from the child of a sibling or peer, that child sub-feature may need to be pulled up a level (or more). Importing from some other feature's sub-feature is akin to violating the strict module boundaries described above, and could indicate that a refactoring is needed.

Consequences
------------



References
----------

Articles on react/redux application organization:

* Primary reference:

  - https://jaysoo.ca/2016/02/28/organizing-redux-application/

* Ducks references:

  - https://github.com/erikras/ducks-modular-redux
  - https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be

* Other reading:

  - https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af
  - https://marmelab.com/blog/2015/12/17/react-directory-structure.html
  - https://redux.js.org/faq/code-structure

