# Permissions map (RBAC)

This document lists which **permission keys** are bound to which **route / page / component / button / behavior**.

Update this file whenever permissions change.

---

## Overview

There are two permission buckets:

### `navbarAccess` (route + sidebar visibility)

- **Where checked**: `src/App.jsx` via `withAccess(navbarAccess.<key>, <Page />)` for gated routes
- **Where used for sidebar visibility**: `src/mock/navigation.js` + `src/layout/AppSidebar.jsx`
- **Effect**:
  - If `false`, user is blocked from navigating to that route (shows `AccessRestrictedPage`)
  - Sidebar item is hidden if `getNavigationItemsByAccess()` filters it out

**Important**: Some nav-items are intentionally **public** (no `navbarAccess` gating), but may still use `componentAccess` to show/hide in-page UI/actions.

### `componentAccess` (in-page UI + actions)

- **Where checked**: each page reads `componentAccess.<domain>.*` from `useUserRole()`
- **Effect**: toggles visibility and/or ability to take actions inside a page (buttons, columns, modals, etc.)

---

## `navbarAccess` bindings (routes / pages)

**File**: `src/App.jsx`

### Public nav-items (no `navbarAccess` gating)

These routes are **always routable** (no `withAccess(...)` guard in `src/App.jsx`):

- **Dashboard**
  - **Routes**: `/admin/dashboard`, `/admin/dashboard/:role` → `src/pages/dashboard/Dashboard.jsx`
- **SEARN Training Catalog**
  - **Routes**:
    - `/admin/searn-training-catalog` → `src/pages/searnTrainingCatalog/SearnTrainingCatalog.jsx`
    - `/admin/searn-training-catalog/:trainingId` → `src/pages/searnTrainingCatalog/SearnTrainingDetail.jsx`
    - `/admin/searn-training-catalog/:trainingId/feedback` → `src/pages/searnTrainingCatalog/SearnTrainingFeedback.jsx`
    - `/admin/searn-training-catalog/providers/:providerSlug` → `src/pages/searnTrainingCatalog/SearnTrainingProvider.jsx`
    - `/admin/searn-training-catalog/providers/:providerSlug/catalog` → `src/pages/searnTrainingCatalog/SearnTrainingProviderCatalog.jsx`
- **Requested Trainings**
  - **Route**: `/admin/requested-trainings` → `src/pages/requestedTrainings/RequestedTrainings.jsx`
- **Profile**
  - **Route**: `/admin/profile` → `src/pages/profile/Profile.jsx`

### Gated nav-items (require `navbarAccess`)

- **`accessCompetencyFramework`**
  - **Routes**: `/admin/competency-frameworks`, `/admin/competency-frameworks/new` → `src/pages/competencyFramework/CompetencyFramework.jsx`
- **`accessActivities`**
  - **Route**: `/admin/activities-management` → `src/pages/activities/Activities.jsx`
- **`accessNrasManagement`**
  - **Route**: `/admin/nras` → `src/pages/nras/Nras.jsx`
- **`accessCountries`**
  - **Route**: `/admin/countries` → `src/pages/countries/Countries.jsx`
- **`accessTrainingProviders`**
  - **Route**: `/admin/training-providers` → `src/pages/trainingProviders/TrainingProviders.jsx`
- **`accessPendingRequests`**
  - **Routes**:
    - `/admin/pending-requests` → `src/pages/pendingRequests/PendingRequests.jsx`
    - `/admin/pending-requests/:requestId` → `src/pages/pendingRequests/PendingRequestDetail.jsx`
- **`accessUsers`**
  - **Routes**:
    - `/admin/users` → `src/pages/users/Users.jsx`
    - `/admin/users/:userId` → `src/pages/users/UserDetailPage.jsx`
- **`accessRoles`**
  - **Route**: `/admin/roles` → `src/pages/roles/Roles.jsx`
- **`accessReports`**
  - **Routes**:
    - `/admin/reports/staff-trained`
    - `/admin/reports/training-offers`
    - `/admin/reports/competency-coverage`
    - `/admin/reports/staff-per-training`
    - `/admin/reports/trainee-satisfaction`
    - `/admin/reports/priority-feedback`
  - **Page**: `src/pages/PlaceholderPage.jsx`
- **`accessSettings`**
  - **Route**: `/admin/settings` → `src/pages/settings/Settings.jsx`

---

## `componentAccess` bindings (page UI / behavior)

### Dashboard (`componentAccess.dashboard.*`)

**File**: `src/pages/dashboard/Dashboard.jsx`

- **`showUsersPerCountry`**
  - **Controls**: renders `<UsersPerCountry />`
  - **Component**: `src/components/usersPerCountry/UsersPerCountry`
- **`showTopRequestedActivities`**
  - **Controls**: renders "Top requested activities" card on Dashboard
  - **Component**: `src/components/dashboardRequests/DashboardRequests.jsx` (`TopRequestedActivitiesCard`)
- **`showPendingRequests`**
  - **Controls**: renders "Pending requests" card on Dashboard
  - **Component**: `src/components/dashboardRequests/DashboardRequests.jsx` (`PendingRequestsCard`)

### Users (`componentAccess.users.*`)

**Files**:
- `src/pages/users/Users.jsx`
- `src/pages/users/UserDetailPage.jsx`
- `src/pages/users/UserRegulatoryPassport.jsx`

- **`canAddUser`**
  - **Controls**: "Add User" button + create flow
- **`canViewUserAbout`**
  - **Controls**:
    - user name becomes link + view (eye) icon appears in Users table
    - page-level guard for `/admin/users/:userId`
- **`canEditUser`**
  - **Controls**: edit actions (table edit icon + edit modal on About page)
- **`canDeleteUser`**
  - **Controls**: delete actions (table delete icon + delete action on About page)
- **`canViewRoleColumn`**
  - **Controls**: shows/hides "Role" column on Users table
- **`canViewCompetencyRoleColumn`**
  - **Controls**: shows/hides "Competency Role" column on Users table
- **`canAssignTrainings`**
  - **Controls**: "Assign Training" button + assign trainings modal on About page
- **`canRemoveAssignedTrainings`**
  - **Controls**: remove icon + confirm dialog for assigned trainings on About page
- **`canViewRegulatoryPassport`**
  - **Controls**:
    - shows Regulatory Passport banner/CTA on About page
    - route guard for `/admin/users/:userId/regulatory-passport`
- **`userFormFields.*`**
  - **Controls**: field-level visibility inside `src/components/addUserModal/AddUserModal.jsx`
  - **Keys**:
    - `showRoleField`
    - `showManagerField`
    - `showCompetencyRoleField`
    - `showCountryField`

### Competency Framework (`componentAccess.competencyFramework.*`)

**File**: `src/pages/competencyFramework/CompetencyFramework.jsx`

- **`showWhoTab`**, **`showSearnTab`**, **`showNraTab`**
  - **Controls**: tab visibility (`frameworkTabs.filter`)
- **`canCreateFrameworkWhoTab`**, **`canCreateFrameworkSearnTab`**, **`canCreateFrameworkNraTab`**
  - **Controls**: ability to create frameworks (and related create-only actions like download template/import) for the active tab
- **`canViewFrameworkWhoTab`**, **`canViewFrameworkSearnTab`**, **`canViewFrameworkNraTab`**
  - **Controls**: read-only access to items within the active tab
- **`canEditFrameworkWhoTab`**, **`canEditFrameworkSearnTab`**, **`canEditFrameworkNraTab`**
  - **Controls**: edit actions for items within the active tab
- **`canDeleteFrameworkWhoTab`**, **`canDeleteFrameworkSearnTab`**, **`canDeleteFrameworkNraTab`**
  - **Controls**: delete actions for items within the active tab
- **Builder tabs (Create/Edit/View)**
  - **Note**: builder tabs are not permission-gated individually (static tabs).
  - **`showSuggestionsTab`** controls whether the "Suggestions" tab is visible and usable.

### Roles

**File**: `src/pages/roles/Roles.jsx`

- **`canAddRole`**
  - **Controls**: "Add New Role" button + create role modal
- **`canViewRole`**
  - **Controls**: view role (card click + view menu item + opens view modal)
- **`canEditRole`**
  - **Controls**: edit menu item + edit role modal
- **`canDeleteRole`**
  - **Controls**: delete menu item + delete confirmation + toast

### Activities

**File**: `src/pages/activities/Activities.jsx`

- **Note**: Activities page no longer uses `componentAccess.activities.*` (UI is not component-permission-gated).

### SEARN Training Catalog (`componentAccess.searnTrainingCatalog.*`)

**Files**:
- `src/pages/searnTrainingCatalog/SearnTrainingCatalog.jsx`
- `src/pages/searnTrainingCatalog/SearnTrainingDetail.jsx`
- `src/pages/searnTrainingCatalog/SearnTrainingFeedback.jsx`
- `src/pages/searnTrainingCatalog/SearnTrainingProvider.jsx`
- `src/pages/searnTrainingCatalog/SearnTrainingProviderCatalog.jsx`

- **Note**: SEARN Training Catalog pages no longer use `componentAccess.searnTrainingCatalog.*` (UI is not component-permission-gated).

### Countries

**File**: `src/pages/countries/Countries.jsx`

- **`canAddCountry`**
  - **Controls**: "Add New SEARN Country" button + modal open
- **`canEditCountry`**
  - **Controls**: edit action/button on country card
- **`canDeleteCountry`**
  - **Controls**: delete action/button + confirmation + toast

### NRAs Management (`componentAccess.nrasManagement.*`)

**File**: `src/pages/nras/Nras.jsx`

- **`canOnboardNra`**
  - **Controls**: "Onboard NRA" button + modal open
- **`canEditNra`**
  - **Controls**: edit action/button in table row
- **`canDeleteNra`**
  - **Controls**: delete action/button + confirmation + toast

### Training Providers

**File**: `src/pages/trainingProviders/TrainingProviders.jsx`

- **`canAddTrainingProvider`**
  - **Controls**: "Add Training Provider" button + modal open
- **`canEditTrainingProvider`**
  - **Controls**: edit action/button in table row
- **`canDeleteTrainingProvider`**
  - **Controls**: delete action/button + confirmation + toast

### Profile

- **Note**: Profile page no longer uses `componentAccess.profile.*` (UI is not component-permission-gated).

### Settings

- **Note**: Settings page no longer uses `componentAccess.settings.*` (UI is not component-permission-gated).

### Pending Requests

- **`canEditPendingRequest`**
  - **Controls**: edit icon/action column visibility and the ability to click a row to open `PendingRequestDetail`

### Requested Trainings

- **Note**: Requested Trainings page no longer uses `componentAccess.requestedTrainings.*` (UI is not component-permission-gated).

