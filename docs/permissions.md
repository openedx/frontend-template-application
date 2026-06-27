# Permissions map (RBAC)

This document lists which **permission keys** are bound to which **route / page / component / button / behavior**.

Update this file whenever permissions change.

---

## Overview

### Data source

Permissions are loaded in `src/services/userRoleDataService.js` (edit the **plug-in block** at the top of that file only):

| Setting | Values | Purpose |
|--------|--------|---------|
| `ROLE_DATA_SOURCE` | `'api'` \| `'local'` | API calls `GET /api/v1/core-permissions/`; local reads bundled JSON |
| `LOCAL_ROLE_DATA_KEY` | `'super-user'` \| `'secretariat'` \| `'training-provider'` | Which file under `src/data/userRole/` when source is `local` |

**No fallback between sources.** If `ROLE_DATA_SOURCE` is `'api'`, a failed or empty API response does **not** load local JSON. If source is `'local'` and the file has no `results` row, the API is **not** called.

**Empty permissions:** When the active source returns no data (API error, empty `results`, or empty local file), the app applies deny-all `navbarAccess` / `componentAccess`. Only **public** routes and in-page UI stay available (see `src/utils/publicRoutes.js` and `hasNavbarAccessForPath` in `App.jsx`).

---

There are two permission buckets:

### `navbarAccess` (route + sidebar visibility)

- **Where checked**: `src/App.jsx` via `withAccess(navbarAccess.<key>, <Page />)` for gated routes
- **Where used for sidebar visibility**: `src/layout/navigation.js` + `src/layout/AppSidebar.jsx`
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
- **`accessMyTrainingCatalog`**
  - **Routes**:
    - `/admin/my-training-catalog` → `src/pages/myTrainingCatalog/MyTrainingCatalog.jsx`
    - `/admin/my-training-catalog/new` → `src/pages/myTrainingCatalog/MyTrainingCatalogCreate.jsx`
    - `/admin/my-training-catalog/:trainingId` → `src/pages/myTrainingCatalog/MyTrainingCatalogDetail.jsx`
    - `/admin/my-training-catalog/:trainingId/feedback` → `src/pages/myTrainingCatalog/MyTrainingCatalogFeedback.jsx`
  - **Role**: enabled for `training-provider` and `super-user`
- **`accessNraSpecificTrainingCatalog`**
  - **Routes** (reuse My Training Catalog pages/components):
    - `/admin/nra-specific-training-catalog` → `src/pages/myTrainingCatalog/MyTrainingCatalog.jsx`
    - `/admin/nra-specific-training-catalog/new` → `src/pages/myTrainingCatalog/MyTrainingCatalogCreate.jsx`
    - `/admin/nra-specific-training-catalog/:trainingId` → `src/pages/myTrainingCatalog/MyTrainingCatalogDetail.jsx`
    - `/admin/nra-specific-training-catalog/:trainingId/feedback` → `src/pages/myTrainingCatalog/MyTrainingCatalogFeedback.jsx`
    - `/admin/nra-specific-training-catalog/providers/:providerSlug` → `src/pages/myTrainingCatalog/NraSpecificTrainingProvider.jsx`
    - `/admin/nra-specific-training-catalog/providers/:providerSlug/catalog` → `src/pages/myTrainingCatalog/NraSpecificTrainingProviderCatalog.jsx`
  - **Role**: enabled for `training-provider` and `super-user`
- **`accessMyTraining`**
  - **Route**: `/admin/my-training/` → `src/pages/myTraining/MyTraining.jsx`
  - **Role**: enabled for `training-provider` and `super-user`
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
- **`accessMyTeam`**
  - **Route**: `/admin/my-team` → `src/pages/myTeam/MyTeam.jsx`
  - **Role**: enabled for `super-user`, `training-provider`, and `secretariat`
- **`accessRegulatoryPassport`**
  - **Route**: `/admin/regulatory-passport` → `src/pages/regulatoryPassport/RegulatoryPassport.jsx`
  - **Role**: enabled for `super-user` and `secretariat`
- **`accessOrganizationProfile`**
  - **Route**: `/admin/organization-profile` → `src/pages/organizationProfile/OrganizationProfile.jsx`
  - **Role**: enabled for `training-provider`, `super-user`, and `secretariat`
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
- **`showTopTrainings`**
  - **Controls**: renders "Our Top Trainings" table on Dashboard
  - **Component**: `src/components/dashboardTopTrainings/DashboardTopTrainings.jsx`
  - **Role**: enabled for `training-provider` and `super-user`
- **`showRecentActivities`**
  - **Controls**: renders "Recent Activities" card on Dashboard
  - **Component**: `src/components/dashboardRecentActivities/DashboardRecentActivities.jsx`
  - **Role**: enabled for `super-user` and `secretariat`
- **`showPopularTrainings`**
  - **Controls**: renders "Popular Trainings" card on Dashboard
  - **Component**: `src/components/dashboardPopularTrainings/DashboardPopularTrainings.jsx`
  - **Role**: enabled for `super-user` and `secretariat`
- **`showQuickActions`**
  - **Controls**: renders "Quick Actions" card on Dashboard
  - **Component**: `src/components/dashboardQuickActions/DashboardQuickActions.jsx`
  - **Role**: enabled for `super-user` and `training-provider`
- **`showRecentTrainingCompletions`**
  - **Controls**: renders "Recent Training Completions" card on Dashboard
  - **Component**: `src/components/dashboardRecentTrainingCompletions/DashboardRecentTrainingCompletions.jsx`
  - **Role**: enabled for `super-user` and `training-provider`

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
- **`canViewAssignedTrainings`**
  - **Controls**: shows/hides the Assigned Trainings section on About page (independent of assign/remove actions)
- **`canViewMappedCompetencies`**
  - **Controls**: shows/hides the Mapped Competencies section on About page
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

### My Team (`componentAccess.myTeam.*`)

**File**: `src/pages/myTeam/MyTeam.jsx`

- **`canAddTeamMember`**
  - **Controls**: "Add Team Member" button + add member modal
- **`canRemoveTeamMember`**
  - **Controls**: Action column + delete icon + remove confirmation dialog

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
- `src/components/searnTrainingCatalog/SearnTrainingCatalogListSection.jsx`
- `src/components/searnTrainingCatalog/RequestTrainingModal.jsx`

- **`canRequestTraining`**
  - **Controls**: "Request Training" button above the catalog table + request training modal
- **`canRequestAccess`**
  - **Controls**: Action column on catalog table with "Request Access" button or "Requested" badge per row + confirmation dialog before submit

### My Training Catalog (`componentAccess.myTrainingCatalog.*`)

**Files**:
- `src/components/myTrainingCatalog/MyTrainingCatalogListSection.jsx`
- `src/pages/myTrainingCatalog/MyTrainingCatalogCreate.jsx`

- **`canCreateTraining`**
  - **Controls**: "Create Training" button on list page + route access to `/admin/my-training-catalog/new`
- **`canEditTraining`**
  - **Controls**: edit icon button in table actions column + route access to `/admin/my-training-catalog/:trainingId/edit` and `/admin/nra-specific-training-catalog/:trainingId/edit` (reuses create form prefilled) (mock toast until edit API is connected)
- **`canDeleteTraining`**
  - **Controls**: delete icon button + confirmation dialog + local mock removal

### NRA-Specific Training Catalog (`componentAccess.nraSpecificTrainingCatalog.*`)

**Files** (shared with My Training Catalog):
- `src/components/myTrainingCatalog/MyTrainingCatalogListSection.jsx`
- `src/pages/myTrainingCatalog/MyTrainingCatalogCreate.jsx`

- **`canCreateTraining`**
  - **Controls**: "Create Training" button on list page + route access to `/admin/nra-specific-training-catalog/new`
- **`canEditTraining`**
  - **Controls**: edit icon button in table actions column + route access to `/admin/my-training-catalog/:trainingId/edit` and `/admin/nra-specific-training-catalog/:trainingId/edit` (reuses create form prefilled)
- **`canDeleteTraining`**
  - **Controls**: delete icon button + confirmation dialog + local mock removal
- **`canViewProviderColumn`**
  - **Controls**: Provider column in NRA-specific catalog table; provider name links to `/admin/nra-specific-training-catalog/providers/:providerSlug` (not SEARN catalog provider routes)
- **`canRequestAccess`**
  - **Controls**: Action column with "Request Access" button or "Requested" badge + confirmation dialog

### My Training (`componentAccess.myTraining.*`)

**File**: `src/pages/myTraining/MyTraining.jsx`

- **`canUpdateTraining`**
  - **Controls**: edit icon button in table actions column + update training status modal

### Countries

**File**: `src/pages/countries/Countries.jsx`

- **`canAddCountry`**
  - **Controls**: "Add New SEARN Country" button + modal open
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

### Profile (`componentAccess.profile.*`)

**File**: `src/pages/profile/Profile.jsx`

- **`showManagerField`**
  - **Controls**: "My Manager" dropdown above About; options from `GET /api/v1/role-assignment/profile/manager-options/`; `manager` (option id, e.g. `manager-u2`) included in PATCH when saving
- **`showCompetencyRoleField`**
  - **Controls**: "Competency Role" input above About; `competency_role` sent as a string array in PATCH when saving
- **`canRequestAdminRole`**
  - **Controls**: "Request Admin Role" button in the page footer (hidden when GET `is_admin` is `true`)

### Settings

- **Note**: Settings page no longer uses `componentAccess.settings.*` (UI is not component-permission-gated).

### Pending Requests

- **`canEditPendingRequest`**
  - **Controls**: edit icon/action column visibility and the ability to click a row to open `PendingRequestDetail`

### Requested Trainings (`componentAccess.requestedTrainings.*`)

**File**: `src/pages/requestedTrainings/RequestedTrainings.jsx`

- **`showOpenCloseButton`**
  - **Controls**: Close / Reopen buttons in the table actions column
- **`showFlagButton`**
  - **Controls**: Flag interest / Flagged toggle button in the table actions column (PATCH `action`: `flag` / `unflag`)

### Organization Profile (`componentAccess.organizationProfile.*`)

**File**: `src/pages/organizationProfile/OrganizationProfile.jsx`

- **`canChangeOrganizationProfile`**
  - **Controls**: enables/disables all form fields, logo upload, save button, and administrator add/edit/delete actions
- **`showAdministratorsSection`**
  - **Controls**: renders the Administrators card (list, add form); administrators are included in PATCH payload when saving

