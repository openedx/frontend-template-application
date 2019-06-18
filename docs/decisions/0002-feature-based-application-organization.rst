2. Feature-based Application Organization
-----------------------------------------

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

This ADR documents an approach and rules of thumb for organizing code modularly by feature, informed by articles and prior art.

Note on terminology: "feature" and "module" are used interchangeably in this ADR. In general, the feature refers to the semantically significant thing, whereas the module refers to the directory of code pertaining to that feature.

Decision
--------

**Following the spirit of these principles is more important than following them to the letter.**

These rules are guidelines. It won't always be reasonable or necessary to follow them to the letter. They provide a set of tools for dealing with complexity. It follows, then, that if you don't have complexity, then you may not need the tools.

Primary guiding principles
==========================

**1. Code is organized into feature directories.**

A feature is a logical or semantically significant grouping of code; what comprises a feature is subjective. It also may not be obvious at first - if code tends to be related or change together, then it's probably part of the same feature.

It's unlikely to be worth agonizing over your feature breakdown; time will tell what's correct moreso than overthinking it. That said, a sufficiently complex set of features will need a similarly robust taxonomy and organizational hierarchy. (This document endeavors to help inform that hierarchy.)  A nice rule of thumb is that a feature should conceptually be able to be extracted into its own npm package with minimal effort.

**2. Create strict module boundaries**

A module should have a public interface exposed via an index.js file in the module directory. Consumers of a feature should limit themselves to importing only from the public exports.

::

  import { MyComponent, reducer as myComponentReducer } from './submodule'; // Good
  import MyComponent from './submodule/MyComponent'; // Bad
  import reducer from './submodule/data/reducers'; // Bad

Modules are configured by their parent. Generally a module will expose a few things which need to be configured make use of them in the consuming code. The reason for doing this is so that the module doesn't make assumptions about it's context (effectively dependency injection).

Examples:

* For React components, this involves including them in JSX and giving them props.
* For services, this is calling their "configure" method and providing them apiClient/configuration, etc.
* For reducers, this is mounting the reducer at an agreed-upon place in the redux store's state tree.

**3. Avoid circular dependencies**

Circular dependencies are unresolvable in webpack, and will result in something being imported as 'undefined'. They're also incredibly difficult and frustrating to track down. Properly factoring your features and supporting modules should help avoid these sorts of issues. In general, a feature should never need to import from its parent or grandparents, and a more "general purpose" module should never be importing from a more specific one. If you find yourself importing from a domain-specific feature in your general utility module, then something is probably ill-factored.

File and directory naming
=========================

This section details a specific taxonomy and hierarchy to help make code modular, approachable and maintainable.

**A. Separate data management from components.**

In order to isolate our view layer (React) from the management of our data, global state, APIs, and side effects, we want to adopt the "ducks" organization (see references). This involves isolating data management into a
sub directory of a feature. We'll use the directory name "data" rather than the traditional "ducks".

**C. React components will be named semantically.**

The convention for React components is for the file to be named for what the component does, so we will preserve this. A given feature may break up its view layer into multiple sub-components without a sub-feature being present.

**B. Files in a module's data directory are named by function.**

In the data sub-directory, the file names describe what each piece of code does. Unlike React components, all of the data handlers (actions, reducers, sagas, selectors, services, etc.) are generally short functions, and so we put them all in the same file together with others of their kind.

::

  /profile
    /index.js // public interface
    /ProfilePage.jsx // view
    /ProfilePhotoUploader.jsx // supporting view
    /data // Note: most files here are named with a plural, as they contain many of the things in question.
      /actions.js
      /constants.js
      /reducers.js
      /sagas.js
      /selectors.js
      /service.js // Note: singular - there's one 'service' here that provides many methods.

If you find yourself desiring to have multiple files of a particular type in the data directory, this is a strong sign that you actually need a sub-feature instead.

**C. Sub-features follow the same naming scheme.**

Sub-features should follow the same rules as any other module.

A module with a sub-module:

::

  /profile
    /index.js // public interface
    /ProfilePage.jsx
    /Avatar.jsx // additional components for a feature reside here at the top level, not in a "components" subdirectory.
    /data
      /actions.js
      /reducers.js
      /sagas.js
      /service.js
    /profile-photo
      /index.js // public interface
      /ProfilePhoto.jsx
      /data
        /actions.js
        /reducers.js
        /selectors.js
    /education // Sparse sub-module
      /index.js // public interface
      /Education.jsx
    /site-language // No view layer sub-module
      /index.js // public interface
      /data
        /actions.js
        /reducers.js

Note that a given feature need not contain files of all types, nor is having files of all types a prerequisite for having a feature. A feature may not contain a view (Component) layer, or in contrast to that, may not need a data directory at all!

Importing rules of thumb
========================

It can be difficult to figure out where it's okay to import from. Following these rules of thumb will help maintain a healthy code organization and should prevent the possibility of circular dependencies.

**I. A feature may not import from its parentage.**

As described above in "Avoid circular dependencies", features should not import from their parent, grandparent, etc. A feature should be agnostic to the context in which it is used. If a module is importing from its parent or grandparent, that implies something is ill-factored.

**II. A feature may import from its children, but not its grandchildren.**

The feature may only import from the exports of its child, which may include exports of the grandchildren. Importing directly from grandchildren (or great grandchildren, etc.) would violate the strict module boundary of the child.

**II. Features may import from their siblings.**

It's acceptable to import from a module's siblings, or the siblings of their parents, grandparents, etc. This is necessary to support code re-use. As an example, assume we have a sub-module with common code to support our web forms.

::

  /feature1
    /sub-form-1
    /sub-form-2
    /forms-common-code

The sub-form modules can import from forms-common-code. The latter has its own strict module boundary and could conceptually be extracted into its own repository/completely independent module as far as they're concerned. They're unaware, conceptually, that it's a child of feature1, and they don't care.

**III. Features may import from the siblings of their parentage.**

This is less intuitive, but is not really any different than the above.

If another feature (feature2) also needs forms-common-code, it should be brought up a level so it's available to feature2, as feature2 cannot "reach into" feature1:

::

  /feature1
    /sub-form-1
    /sub-form-2
  /forms-common-code
  /feature2 // can now use forms-common-code

In a complex app, you could imagine that forms-common-code needs to be brought up several levels, in which case our imports might look like:

::

  import { formStuff } from '../../../forms-common-code';

This is okay. Conceptually it's no different than importing from a third party npm package, we just happen to know the code we want is up a few directories nearby, rather than using the syntactic sugar of a pathless import from node_modules.

At some point, if forms-common-code is general purpose enough, we may want to extract it from this repository/set of features all together.

Consequences
------------

This organization has been implemented in several of our micro-frontends so far (frontend-app-account and frontend-app-payment most significantly) and we feel it has improved the organization and approachability of the apps. When converting frontend-app-account to use this organization, it took 2-3 days to refactor the code.

It's worth noting that to get this right, it may actually involve changing the way the modules interact with each other. It isn't as simple as just moving files around and copy/pasting code. For instance, in frontend-app-account, it became obvious very quickly that to create strict module boundaries, we had to change the way that our service layers (server requests) were configured to keep them from importing their own configuration from their parent/grandparent. Similarly, our redux store tree of reducers became more complex and deeply nested.

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

