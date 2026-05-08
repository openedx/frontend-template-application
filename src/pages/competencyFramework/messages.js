import { defineMessages } from '@edx/frontend-platform/i18n';

const competencyFrameworkMessages = defineMessages({
  downloadTemplate: {
    id: 'app.competencyFramework.actions.downloadTemplate',
    defaultMessage: 'Download Template',
    description: 'Download template button label',
  },
  importFromExcel: {
    id: 'app.competencyFramework.actions.importFromExcel',
    defaultMessage: 'Import from Excel',
    description: 'Import from excel button label',
  },
  createFramework: {
    id: 'app.competencyFramework.actions.createFramework',
    defaultMessage: 'Create Framework',
    description: 'Create framework button label',
  },
  viewAction: {
    id: 'app.competencyFramework.card.actions.view',
    defaultMessage: 'View framework',
    description: 'View framework action',
  },
  editAction: {
    id: 'app.competencyFramework.card.actions.edit',
    defaultMessage: 'Edit framework',
    description: 'Edit framework action',
  },
  deleteAction: {
    id: 'app.competencyFramework.card.actions.delete',
    defaultMessage: 'Delete framework',
    description: 'Delete framework action',
  },
  frameworkDeleteDialogTitle: {
    id: 'app.competencyFramework.card.deleteDialog.title',
    defaultMessage: 'Delete Framework',
    description: 'Delete framework dialog title',
  },
  frameworkDeleteDialogDescription: {
    id: 'app.competencyFramework.card.deleteDialog.description',
    defaultMessage: 'Are you sure you want to delete "{name}"?',
    description: 'Delete framework dialog description',
  },
  frameworkDeleteDialogCancel: {
    id: 'app.competencyFramework.card.deleteDialog.cancel',
    defaultMessage: 'Cancel',
    description: 'Delete framework dialog cancel button',
  },
  frameworkDeleteDialogConfirm: {
    id: 'app.competencyFramework.card.deleteDialog.confirm',
    defaultMessage: 'Delete',
    description: 'Delete framework dialog confirm button',
  },
  frameworkDeleteSuccessTitle: {
    id: 'app.competencyFramework.card.delete.success.title',
    defaultMessage: 'Framework deleted',
    description: 'Delete framework success toast title',
  },
  frameworkDeleteSuccessDescription: {
    id: 'app.competencyFramework.card.delete.success.description',
    defaultMessage: '"{name}" deleted successfully.',
    description: 'Delete framework success toast description',
  },
  frameworkDeleteFailedTitle: {
    id: 'app.competencyFramework.card.delete.failed.title',
    defaultMessage: 'Delete failed',
    description: 'Delete framework failed toast title',
  },
  frameworkDeleteFailedDescription: {
    id: 'app.competencyFramework.card.delete.failed.description',
    defaultMessage: 'Unable to delete framework. Please try again.',
    description: 'Delete framework failed toast description',
  },
  metaDomains: {
    id: 'app.competencyFramework.card.meta.domains',
    defaultMessage: '{count} Domains',
    description: 'Domains count text',
  },
  metaSubDomains: {
    id: 'app.competencyFramework.card.meta.subDomains',
    defaultMessage: '{count} Sub-Domains',
    description: 'Sub-domains count text',
  },
  metaCreated: {
    id: 'app.competencyFramework.card.meta.created',
    defaultMessage: 'Created {date}',
    description: 'Created date text',
  },
  noFrameworkFound: {
    id: 'app.competencyFramework.empty.noFramework',
    defaultMessage: 'No frameworks available for this tab.',
    description: 'Empty state for framework list',
  },
  importModalTitle: {
    id: 'app.competencyFramework.import.modal.title',
    defaultMessage: 'Import Framework from Excel',
    description: 'Title for import framework modal',
  },
  importModalDescription: {
    id: 'app.competencyFramework.import.modal.description',
    defaultMessage: 'Fill in the framework details in the file, then upload it here.',
    description: 'Description for import framework modal',
  },
  importModalChooseFile: {
    id: 'app.competencyFramework.import.modal.chooseFile',
    defaultMessage: 'Choose file (.xlsx, .csv)',
    description: 'Choose file label for import framework modal',
  },
  importModalCancel: {
    id: 'app.competencyFramework.import.modal.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button label for import framework modal',
  },
  importModalImport: {
    id: 'app.competencyFramework.import.modal.import',
    defaultMessage: 'Import',
    description: 'Import button label for import framework modal',
  },
  backToFrameworks: {
    id: 'app.competencyFramework.builder.back',
    defaultMessage: 'Back to Frameworks',
    description: 'Back button label in create framework mode',
  },
  builderCreateFramework: {
    id: 'app.competencyFramework.builder.create',
    defaultMessage: 'Create Framework',
    description: 'Create framework button in builder mode',
  },
  tabGeneralInformation: {
    id: 'app.competencyFramework.builder.tab.general',
    defaultMessage: 'General Information',
    description: 'General information tab label',
  },
  tabIntroduction: {
    id: 'app.competencyFramework.builder.tab.introduction',
    defaultMessage: 'Introduction',
    description: 'Introduction tab label',
  },
  tabOverview: {
    id: 'app.competencyFramework.builder.tab.overview',
    defaultMessage: 'Overview',
    description: 'Overview tab label',
  },
  tabDomains: {
    id: 'app.competencyFramework.builder.tab.domains',
    defaultMessage: 'Domains',
    description: 'Domains tab label',
  },
  tabSubDomain: {
    id: 'app.competencyFramework.builder.tab.subDomain',
    defaultMessage: 'Sub-Domain',
    description: 'Sub-domain tab label',
  },
  tabRole: {
    id: 'app.competencyFramework.builder.tab.role',
    defaultMessage: 'Role',
    description: 'Role tab label',
  },
  tabProficiencyLevel: {
    id: 'app.competencyFramework.builder.tab.proficiency',
    defaultMessage: 'Proficiency Level',
    description: 'Proficiency level tab label',
  },
  tabOrgCompetencies: {
    id: 'app.competencyFramework.builder.tab.orgCompetencies',
    defaultMessage: 'Organizational-level competencies',
    description: 'Organizational competencies tab label',
  },
  tabRoleSpecificCompetencies: {
    id: 'app.competencyFramework.builder.tab.roleCompetencies',
    defaultMessage: 'Role-specific Competencies',
    description: 'Role-specific competencies tab label',
  },
  tabRoleSpecificActivities: {
    id: 'app.competencyFramework.builder.tab.activities',
    defaultMessage: 'Role-specific Activities',
    description: 'Role-specific activities tab label',
  },
  fieldName: {
    id: 'app.competencyFramework.builder.field.name',
    defaultMessage: 'Name',
    description: 'Name field label',
  },
  fieldNamePlaceholder: {
    id: 'app.competencyFramework.builder.field.name.placeholder',
    defaultMessage: 'Enter framework name',
    description: 'Name field placeholder',
  },
  fieldTypeOfProduct: {
    id: 'app.competencyFramework.builder.field.typeOfProduct',
    defaultMessage: 'Type of Product',
    description: 'Type of product field label',
  },
  fieldDescription: {
    id: 'app.competencyFramework.builder.field.description',
    defaultMessage: 'Description',
    description: 'Description field label',
  },
  fieldDescriptionPlaceholder: {
    id: 'app.competencyFramework.builder.field.description.placeholder',
    defaultMessage: 'Enter framework description (HTML supported)',
    description: 'Description field placeholder',
  },
  fieldSourceFramework: {
    id: 'app.competencyFramework.builder.field.sourceFramework',
    defaultMessage: 'Source Framework',
    description: 'Source framework field label',
  },
  fieldSourceFrameworkPlaceholder: {
    id: 'app.competencyFramework.builder.field.sourceFramework.placeholder',
    defaultMessage: 'Select source framework',
    description: 'Source framework placeholder',
  },
  builderDropdownSearchPlaceholder: {
    id: 'app.competencyFramework.builder.dropdown.search.placeholder',
    defaultMessage: 'Type to filter options...',
    description: 'Search placeholder for builder dropdown',
  },
  builderDropdownNoOptions: {
    id: 'app.competencyFramework.builder.dropdown.noOptions',
    defaultMessage: 'No options found.',
    description: 'No options text for builder dropdown',
  },
  editorLabel: {
    id: 'app.competencyFramework.builder.editor.label',
    defaultMessage: 'Editor',
    description: 'Editor mode label',
  },
  previewLabel: {
    id: 'app.competencyFramework.builder.preview.label',
    defaultMessage: 'Preview',
    description: 'Preview mode label',
  },
  listLabel: {
    id: 'app.competencyFramework.builder.list.label',
    defaultMessage: 'List',
    description: 'List formatting label',
  },
  boldLabel: {
    id: 'app.competencyFramework.builder.bold.label',
    defaultMessage: 'B',
    description: 'Bold formatting label',
  },
  italicLabel: {
    id: 'app.competencyFramework.builder.italic.label',
    defaultMessage: 'I',
    description: 'Italic formatting label',
  },
  underlineLabel: {
    id: 'app.competencyFramework.builder.underline.label',
    defaultMessage: 'U',
    description: 'Underline formatting label',
  },
  heading3Label: {
    id: 'app.competencyFramework.builder.heading3.label',
    defaultMessage: 'H3',
    description: 'Heading 3 formatting label',
  },
  generalSaveButton: {
    id: 'app.competencyFramework.builder.general.save',
    defaultMessage: 'Save',
    description: 'Save button label in general information tab',
  },
  sectionIntroductionTitle: {
    id: 'app.competencyFramework.builder.section.introduction.title',
    defaultMessage: 'Introduction',
    description: 'Introduction section title',
  },
  sectionIntroductionDescription: {
    id: 'app.competencyFramework.builder.section.introduction.description',
    defaultMessage: 'Configure introduction content for this framework.',
    description: 'Introduction section description',
  },
  introductionBackground: {
    id: 'app.competencyFramework.builder.introduction.background',
    defaultMessage: 'Background',
    description: 'Background label in introduction tab',
  },
  introductionBackgroundPlaceholder: {
    id: 'app.competencyFramework.builder.introduction.background.placeholder',
    defaultMessage: 'Enter background information (HTML supported)',
    description: 'Background placeholder in introduction tab',
  },
  introductionObjectives: {
    id: 'app.competencyFramework.builder.introduction.objectives',
    defaultMessage: 'Objectives',
    description: 'Objectives label in introduction tab',
  },
  introductionObjectivesPlaceholder: {
    id: 'app.competencyFramework.builder.introduction.objectives.placeholder',
    defaultMessage: 'Enter objectives (HTML supported)',
    description: 'Objectives placeholder in introduction tab',
  },
  sectionOverviewTitle: {
    id: 'app.competencyFramework.builder.section.overview.title',
    defaultMessage: 'Overview',
    description: 'Overview section title',
  },
  sectionOverviewDescription: {
    id: 'app.competencyFramework.builder.section.overview.description',
    defaultMessage: 'Configure overview details for this framework.',
    description: 'Overview section description',
  },
  overviewCompetencyModel: {
    id: 'app.competencyFramework.builder.overview.competencyModel',
    defaultMessage: 'Competency Model',
    description: 'Competency model label in overview tab',
  },
  overviewCompetencyModelPlaceholder: {
    id: 'app.competencyFramework.builder.overview.competencyModel.placeholder',
    defaultMessage: 'Describe the competency model (HTML supported)',
    description: 'Competency model placeholder in overview tab',
  },
  sectionDomainsTitle: {
    id: 'app.competencyFramework.builder.section.domains.title',
    defaultMessage: 'Domains',
    description: 'Domains section title',
  },
  sectionDomainsDescription: {
    id: 'app.competencyFramework.builder.section.domains.description',
    defaultMessage: 'Manage domains linked to this framework.',
    description: 'Domains section description',
  },
  domainsCompetencyType: {
    id: 'app.competencyFramework.builder.domains.competencyType',
    defaultMessage: 'Competency Type',
    description: 'Competency type field label in domains tab',
  },
  domainsCompetencyTypePlaceholder: {
    id: 'app.competencyFramework.builder.domains.competencyType.placeholder',
    defaultMessage: 'e.g. Meta-competencies, Core activities',
    description: 'Competency type field placeholder in domains tab',
  },
  domainsFieldLabel: {
    id: 'app.competencyFramework.builder.domains.field.label',
    defaultMessage: 'Domains',
    description: 'Domains field label in domains tab',
  },
  addCompetencyType: {
    id: 'app.competencyFramework.builder.domains.addCompetencyType',
    defaultMessage: 'Add Competency Type',
    description: 'Add competency type button label',
  },
  addNewDomain: {
    id: 'app.competencyFramework.builder.domains.addNewDomain',
    defaultMessage: 'Add new domain',
    description: 'Add new domain action label',
  },
  deleteCompetencyType: {
    id: 'app.competencyFramework.builder.domains.deleteCompetencyType',
    defaultMessage: 'Delete competency type',
    description: 'Delete competency type button label',
  },
  deleteDialogTitle: {
    id: 'app.competencyFramework.builder.domains.deleteDialog.title',
    defaultMessage: 'Delete Competency Type',
    description: 'Delete dialog title for competency type',
  },
  deleteDialogDescription: {
    id: 'app.competencyFramework.builder.domains.deleteDialog.description',
    defaultMessage: 'Are you sure you want to delete "{name}"?',
    description: 'Delete dialog description for competency type',
  },
  deleteDialogCancel: {
    id: 'app.competencyFramework.builder.domains.deleteDialog.cancel',
    defaultMessage: 'Cancel',
    description: 'Delete dialog cancel button',
  },
  deleteDialogConfirm: {
    id: 'app.competencyFramework.builder.domains.deleteDialog.confirm',
    defaultMessage: 'Delete',
    description: 'Delete dialog confirm button',
  },
  deleteSuccessTitle: {
    id: 'app.competencyFramework.builder.domains.delete.success.title',
    defaultMessage: 'Deleted',
    description: 'Delete success toast title',
  },
  deleteSuccessDescription: {
    id: 'app.competencyFramework.builder.domains.delete.success.description',
    defaultMessage: 'Competency type deleted successfully.',
    description: 'Delete success toast description',
  },
  deleteFailedTitle: {
    id: 'app.competencyFramework.builder.domains.delete.failed.title',
    defaultMessage: 'Delete failed',
    description: 'Delete failed toast title',
  },
  deleteFailedDescription: {
    id: 'app.competencyFramework.builder.domains.delete.failed.description',
    defaultMessage: 'Unable to delete competency type. Please try again.',
    description: 'Delete failed toast description',
  },
  deleteBlockedDescription: {
    id: 'app.competencyFramework.builder.domains.delete.blocked.description',
    defaultMessage: 'At least one competency type is required.',
    description: 'Delete blocked toast description',
  },
  addDomainModalTitle: {
    id: 'app.competencyFramework.builder.domains.addDomain.modal.title',
    defaultMessage: 'Add New Domain',
    description: 'Add new domain modal title',
  },
  addDomainModalDomainId: {
    id: 'app.competencyFramework.builder.domains.addDomain.field.id',
    defaultMessage: 'Domain ID',
    description: 'Domain id field label in add domain modal',
  },
  addDomainModalDomainIdPlaceholder: {
    id: 'app.competencyFramework.builder.domains.addDomain.field.id.placeholder',
    defaultMessage: 'e.g. D13',
    description: 'Domain id placeholder in add domain modal',
  },
  addDomainModalDomainName: {
    id: 'app.competencyFramework.builder.domains.addDomain.field.name',
    defaultMessage: 'Domain Name',
    description: 'Domain name field label in add domain modal',
  },
  addDomainModalDomainNamePlaceholder: {
    id: 'app.competencyFramework.builder.domains.addDomain.field.name.placeholder',
    defaultMessage: 'Enter domain name',
    description: 'Domain name placeholder in add domain modal',
  },
  addDomainModalDomainDescription: {
    id: 'app.competencyFramework.builder.domains.addDomain.field.description',
    defaultMessage: 'Domain Description',
    description: 'Domain description field label in add domain modal',
  },
  addDomainModalDomainDescriptionPlaceholder: {
    id: 'app.competencyFramework.builder.domains.addDomain.field.description.placeholder',
    defaultMessage: 'Enter domain description',
    description: 'Domain description placeholder in add domain modal',
  },
  addDomainModalCancel: {
    id: 'app.competencyFramework.builder.domains.addDomain.modal.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button label in add domain modal',
  },
  addDomainModalConfirm: {
    id: 'app.competencyFramework.builder.domains.addDomain.modal.confirm',
    defaultMessage: 'Add Domain',
    description: 'Add domain button label in add domain modal',
  },
  addDomainSuccessTitle: {
    id: 'app.competencyFramework.builder.domains.addDomain.success.title',
    defaultMessage: 'Domain added',
    description: 'Add domain success toast title',
  },
  addDomainSuccessDescription: {
    id: 'app.competencyFramework.builder.domains.addDomain.success.description',
    defaultMessage: 'Domain option added successfully.',
    description: 'Add domain success toast description',
  },
  addDomainDuplicateTitle: {
    id: 'app.competencyFramework.builder.domains.addDomain.duplicate.title',
    defaultMessage: 'Duplicate domain',
    description: 'Duplicate domain toast title',
  },
  addDomainDuplicateDescription: {
    id: 'app.competencyFramework.builder.domains.addDomain.duplicate.description',
    defaultMessage: 'A domain with the same ID already exists.',
    description: 'Duplicate domain toast description',
  },
  sectionSubDomainsTitle: {
    id: 'app.competencyFramework.builder.section.subDomains.title',
    defaultMessage: 'Sub-Domain',
    description: 'Sub-domain section title',
  },
  sectionSubDomainsDescription: {
    id: 'app.competencyFramework.builder.section.subDomains.description',
    defaultMessage: 'Manage sub-domains linked to this framework.',
    description: 'Sub-domain section description',
  },
  subDomainsCompetencyType: {
    id: 'app.competencyFramework.builder.subDomains.competencyType',
    defaultMessage: 'Competency Type',
    description: 'Competency type field label in sub-domain tab',
  },
  subDomainsCompetencyTypePlaceholder: {
    id: 'app.competencyFramework.builder.subDomains.competencyType.placeholder',
    defaultMessage: 'e.g. Technical competencies',
    description: 'Competency type field placeholder in sub-domain tab',
  },
  subDomainsFieldLabel: {
    id: 'app.competencyFramework.builder.subDomains.field.label',
    defaultMessage: 'Sub-Domains',
    description: 'Sub-domains field label in sub-domain tab',
  },
  addSubDomainCompetencyType: {
    id: 'app.competencyFramework.builder.subDomains.addCompetencyType',
    defaultMessage: 'Add Competency Type',
    description: 'Add competency type button label for sub-domain tab',
  },
  addNewSubDomain: {
    id: 'app.competencyFramework.builder.subDomains.addNewSubDomain',
    defaultMessage: 'Add new sub-domain',
    description: 'Add new sub-domain action label',
  },
  deleteSubDomainCompetencyType: {
    id: 'app.competencyFramework.builder.subDomains.deleteCompetencyType',
    defaultMessage: 'Delete competency type',
    description: 'Delete competency type button label in sub-domain tab',
  },
  deleteSubDomainDialogTitle: {
    id: 'app.competencyFramework.builder.subDomains.deleteDialog.title',
    defaultMessage: 'Delete Competency Type',
    description: 'Delete dialog title for sub-domain competency type',
  },
  deleteSubDomainDialogDescription: {
    id: 'app.competencyFramework.builder.subDomains.deleteDialog.description',
    defaultMessage: 'Are you sure you want to delete "{name}"?',
    description: 'Delete dialog description for sub-domain competency type',
  },
  deleteSubDomainDialogCancel: {
    id: 'app.competencyFramework.builder.subDomains.deleteDialog.cancel',
    defaultMessage: 'Cancel',
    description: 'Delete dialog cancel button for sub-domain tab',
  },
  deleteSubDomainDialogConfirm: {
    id: 'app.competencyFramework.builder.subDomains.deleteDialog.confirm',
    defaultMessage: 'Delete',
    description: 'Delete dialog confirm button for sub-domain tab',
  },
  deleteSubDomainSuccessTitle: {
    id: 'app.competencyFramework.builder.subDomains.delete.success.title',
    defaultMessage: 'Deleted',
    description: 'Delete success toast title for sub-domain tab',
  },
  deleteSubDomainSuccessDescription: {
    id: 'app.competencyFramework.builder.subDomains.delete.success.description',
    defaultMessage: 'Competency type deleted successfully.',
    description: 'Delete success toast description for sub-domain tab',
  },
  deleteSubDomainFailedTitle: {
    id: 'app.competencyFramework.builder.subDomains.delete.failed.title',
    defaultMessage: 'Delete failed',
    description: 'Delete failed toast title for sub-domain tab',
  },
  deleteSubDomainFailedDescription: {
    id: 'app.competencyFramework.builder.subDomains.delete.failed.description',
    defaultMessage: 'Unable to delete competency type. Please try again.',
    description: 'Delete failed toast description for sub-domain tab',
  },
  deleteSubDomainBlockedDescription: {
    id: 'app.competencyFramework.builder.subDomains.delete.blocked.description',
    defaultMessage: 'At least one competency type is required.',
    description: 'Delete blocked toast description for sub-domain tab',
  },
  addSubDomainModalTitle: {
    id: 'app.competencyFramework.builder.subDomains.addSubDomain.modal.title',
    defaultMessage: 'Add New Sub-Domain',
    description: 'Add new sub-domain modal title',
  },
  addSubDomainModalParentDomain: {
    id: 'app.competencyFramework.builder.subDomains.addSubDomain.field.parentDomain',
    defaultMessage: 'Parent Domain',
    description: 'Parent domain field label in add sub-domain modal',
  },
  addSubDomainModalParentDomainPlaceholder: {
    id: 'app.competencyFramework.builder.subDomains.addSubDomain.field.parentDomain.placeholder',
    defaultMessage: 'Select parent domain',
    description: 'Parent domain placeholder in add sub-domain modal',
  },
  addSubDomainModalSubDomainId: {
    id: 'app.competencyFramework.builder.subDomains.addSubDomain.field.id',
    defaultMessage: 'Sub-Domain ID',
    description: 'Sub-domain id field label in add sub-domain modal',
  },
  addSubDomainModalSubDomainIdPlaceholder: {
    id: 'app.competencyFramework.builder.subDomains.addSubDomain.field.id.placeholder',
    defaultMessage: 'e.g. SD6',
    description: 'Sub-domain id placeholder in add sub-domain modal',
  },
  addSubDomainModalSubDomainName: {
    id: 'app.competencyFramework.builder.subDomains.addSubDomain.field.name',
    defaultMessage: 'Sub-Domain Name',
    description: 'Sub-domain name field label in add sub-domain modal',
  },
  addSubDomainModalSubDomainNamePlaceholder: {
    id: 'app.competencyFramework.builder.subDomains.addSubDomain.field.name.placeholder',
    defaultMessage: 'Enter sub-domain name',
    description: 'Sub-domain name placeholder in add sub-domain modal',
  },
  addSubDomainModalSubDomainDescription: {
    id: 'app.competencyFramework.builder.subDomains.addSubDomain.field.description',
    defaultMessage: 'Sub-Domain Description',
    description: 'Sub-domain description field label in add sub-domain modal',
  },
  addSubDomainModalSubDomainDescriptionPlaceholder: {
    id: 'app.competencyFramework.builder.subDomains.addSubDomain.field.description.placeholder',
    defaultMessage: 'Enter sub-domain description',
    description: 'Sub-domain description placeholder in add sub-domain modal',
  },
  addSubDomainModalCancel: {
    id: 'app.competencyFramework.builder.subDomains.addSubDomain.modal.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button label in add sub-domain modal',
  },
  addSubDomainModalConfirm: {
    id: 'app.competencyFramework.builder.subDomains.addSubDomain.modal.confirm',
    defaultMessage: 'Add Sub-Domain',
    description: 'Add sub-domain button label in add sub-domain modal',
  },
  addSubDomainSuccessTitle: {
    id: 'app.competencyFramework.builder.subDomains.addSubDomain.success.title',
    defaultMessage: 'Sub-domain added',
    description: 'Add sub-domain success toast title',
  },
  addSubDomainSuccessDescription: {
    id: 'app.competencyFramework.builder.subDomains.addSubDomain.success.description',
    defaultMessage: 'Sub-domain option added successfully.',
    description: 'Add sub-domain success toast description',
  },
  addSubDomainDuplicateTitle: {
    id: 'app.competencyFramework.builder.subDomains.addSubDomain.duplicate.title',
    defaultMessage: 'Duplicate sub-domain',
    description: 'Duplicate sub-domain toast title',
  },
  addSubDomainDuplicateDescription: {
    id: 'app.competencyFramework.builder.subDomains.addSubDomain.duplicate.description',
    defaultMessage: 'A sub-domain with the same ID already exists.',
    description: 'Duplicate sub-domain toast description',
  },
  sectionRoleTitle: {
    id: 'app.competencyFramework.builder.section.role.title',
    defaultMessage: 'Role',
    description: 'Role section title',
  },
  sectionRoleDescription: {
    id: 'app.competencyFramework.builder.section.role.description',
    defaultMessage: 'Manage roles mapped to this framework.',
    description: 'Role section description',
  },
  roleTabTitle: {
    id: 'app.competencyFramework.builder.role.title',
    defaultMessage: 'Roles',
    description: 'Heading for role tab',
  },
  roleTabDescription: {
    id: 'app.competencyFramework.builder.role.description',
    defaultMessage: 'Define the roles applicable to this competency framework.',
    description: 'Description for role tab',
  },
  roleTabAddRole: {
    id: 'app.competencyFramework.builder.role.addRole',
    defaultMessage: 'Add Role',
    description: 'Add role button label in role tab',
  },
  roleTabDeleteRole: {
    id: 'app.competencyFramework.builder.role.deleteRole',
    defaultMessage: 'Delete role',
    description: 'Delete role button label in role tab',
  },
  roleTabRoleNamePlaceholder: {
    id: 'app.competencyFramework.builder.role.roleName.placeholder',
    defaultMessage: 'Enter role name',
    description: 'Role name placeholder in role tab',
  },
  roleTabDeleteDialogTitle: {
    id: 'app.competencyFramework.builder.role.deleteDialog.title',
    defaultMessage: 'Delete Role',
    description: 'Delete role dialog title in role tab',
  },
  roleTabDeleteDialogDescription: {
    id: 'app.competencyFramework.builder.role.deleteDialog.description',
    defaultMessage: 'Are you sure you want to delete "{name}"?',
    description: 'Delete role dialog description in role tab',
  },
  roleTabDeleteDialogCancel: {
    id: 'app.competencyFramework.builder.role.deleteDialog.cancel',
    defaultMessage: 'Cancel',
    description: 'Delete role dialog cancel button in role tab',
  },
  roleTabDeleteDialogConfirm: {
    id: 'app.competencyFramework.builder.role.deleteDialog.confirm',
    defaultMessage: 'Delete',
    description: 'Delete role dialog confirm button in role tab',
  },
  roleTabDeleteSuccessTitle: {
    id: 'app.competencyFramework.builder.role.delete.success.title',
    defaultMessage: 'Role deleted',
    description: 'Delete role success toast title in role tab',
  },
  roleTabDeleteSuccessDescription: {
    id: 'app.competencyFramework.builder.role.delete.success.description',
    defaultMessage: 'Role deleted successfully.',
    description: 'Delete role success toast description in role tab',
  },
  roleTabDeleteFailedTitle: {
    id: 'app.competencyFramework.builder.role.delete.failed.title',
    defaultMessage: 'Delete failed',
    description: 'Delete role failed toast title in role tab',
  },
  roleTabDeleteFailedDescription: {
    id: 'app.competencyFramework.builder.role.delete.failed.description',
    defaultMessage: 'Unable to delete role. Please try again.',
    description: 'Delete role failed toast description in role tab',
  },
  roleTabDeleteBlockedDescription: {
    id: 'app.competencyFramework.builder.role.delete.blocked.description',
    defaultMessage: 'At least one role is required.',
    description: 'Delete role blocked toast description in role tab',
  },
  roleTabSaveSuccessTitle: {
    id: 'app.competencyFramework.builder.role.save.success.title',
    defaultMessage: 'Saved',
    description: 'Save role tab success toast title',
  },
  roleTabSaveSuccessDescription: {
    id: 'app.competencyFramework.builder.role.save.success.description',
    defaultMessage: 'Roles saved successfully.',
    description: 'Save role tab success toast description',
  },
  roleTabSaveFailedTitle: {
    id: 'app.competencyFramework.builder.role.save.failed.title',
    defaultMessage: 'Save failed',
    description: 'Save role tab failed toast title',
  },
  roleTabSaveFailedDescription: {
    id: 'app.competencyFramework.builder.role.save.failed.description',
    defaultMessage: 'Unable to save roles. Please try again.',
    description: 'Save role tab failed toast description',
  },
  sectionProficiencyTitle: {
    id: 'app.competencyFramework.builder.section.proficiency.title',
    defaultMessage: 'Proficiency Level',
    description: 'Proficiency level section title',
  },
  sectionProficiencyDescription: {
    id: 'app.competencyFramework.builder.section.proficiency.description',
    defaultMessage: 'Define proficiency levels for this framework.',
    description: 'Proficiency level section description',
  },
  proficiencyTabTitle: {
    id: 'app.competencyFramework.builder.proficiency.title',
    defaultMessage: 'Proficiency Levels',
    description: 'Heading for proficiency tab',
  },
  proficiencyTabDescription: {
    id: 'app.competencyFramework.builder.proficiency.description',
    defaultMessage: 'Define the proficiency levels used in this competency framework.',
    description: 'Description for proficiency tab',
  },
  proficiencyTabAddLevel: {
    id: 'app.competencyFramework.builder.proficiency.addLevel',
    defaultMessage: 'Add Level',
    description: 'Add level button label in proficiency tab',
  },
  proficiencyTabCodeLabel: {
    id: 'app.competencyFramework.builder.proficiency.code.label',
    defaultMessage: 'Code',
    description: 'Code field label in proficiency tab',
  },
  proficiencyTabCodePlaceholder: {
    id: 'app.competencyFramework.builder.proficiency.code.placeholder',
    defaultMessage: 'e.g. L1',
    description: 'Code placeholder in proficiency tab',
  },
  proficiencyTabNameLabel: {
    id: 'app.competencyFramework.builder.proficiency.name.label',
    defaultMessage: 'Name',
    description: 'Name field label in proficiency tab',
  },
  proficiencyTabNamePlaceholder: {
    id: 'app.competencyFramework.builder.proficiency.name.placeholder',
    defaultMessage: 'e.g. Foundation',
    description: 'Name placeholder in proficiency tab',
  },
  proficiencyTabDeleteLevel: {
    id: 'app.competencyFramework.builder.proficiency.deleteLevel',
    defaultMessage: 'Delete level',
    description: 'Delete level button label in proficiency tab',
  },
  proficiencyTabDeleteDialogTitle: {
    id: 'app.competencyFramework.builder.proficiency.deleteDialog.title',
    defaultMessage: 'Delete Proficiency Level',
    description: 'Delete level dialog title in proficiency tab',
  },
  proficiencyTabDeleteDialogDescription: {
    id: 'app.competencyFramework.builder.proficiency.deleteDialog.description',
    defaultMessage: 'Are you sure you want to delete "{name}"?',
    description: 'Delete level dialog description in proficiency tab',
  },
  proficiencyTabDeleteDialogCancel: {
    id: 'app.competencyFramework.builder.proficiency.deleteDialog.cancel',
    defaultMessage: 'Cancel',
    description: 'Delete level dialog cancel button in proficiency tab',
  },
  proficiencyTabDeleteDialogConfirm: {
    id: 'app.competencyFramework.builder.proficiency.deleteDialog.confirm',
    defaultMessage: 'Delete',
    description: 'Delete level dialog confirm button in proficiency tab',
  },
  proficiencyTabDeleteSuccessTitle: {
    id: 'app.competencyFramework.builder.proficiency.delete.success.title',
    defaultMessage: 'Level deleted',
    description: 'Delete level success toast title in proficiency tab',
  },
  proficiencyTabDeleteSuccessDescription: {
    id: 'app.competencyFramework.builder.proficiency.delete.success.description',
    defaultMessage: 'Proficiency level deleted successfully.',
    description: 'Delete level success toast description in proficiency tab',
  },
  proficiencyTabDeleteFailedTitle: {
    id: 'app.competencyFramework.builder.proficiency.delete.failed.title',
    defaultMessage: 'Delete failed',
    description: 'Delete level failed toast title in proficiency tab',
  },
  proficiencyTabDeleteFailedDescription: {
    id: 'app.competencyFramework.builder.proficiency.delete.failed.description',
    defaultMessage: 'Unable to delete proficiency level. Please try again.',
    description: 'Delete level failed toast description in proficiency tab',
  },
  proficiencyTabDeleteBlockedDescription: {
    id: 'app.competencyFramework.builder.proficiency.delete.blocked.description',
    defaultMessage: 'At least one proficiency level is required.',
    description: 'Delete level blocked toast description in proficiency tab',
  },
  proficiencyTabSaveSuccessTitle: {
    id: 'app.competencyFramework.builder.proficiency.save.success.title',
    defaultMessage: 'Saved',
    description: 'Save proficiency tab success toast title',
  },
  proficiencyTabSaveSuccessDescription: {
    id: 'app.competencyFramework.builder.proficiency.save.success.description',
    defaultMessage: 'Proficiency levels saved successfully.',
    description: 'Save proficiency tab success toast description',
  },
  proficiencyTabSaveFailedTitle: {
    id: 'app.competencyFramework.builder.proficiency.save.failed.title',
    defaultMessage: 'Save failed',
    description: 'Save proficiency tab failed toast title',
  },
  proficiencyTabSaveFailedDescription: {
    id: 'app.competencyFramework.builder.proficiency.save.failed.description',
    defaultMessage: 'Unable to save proficiency levels. Please try again.',
    description: 'Save proficiency tab failed toast description',
  },
  sectionOrgCompetenciesTitle: {
    id: 'app.competencyFramework.builder.section.orgCompetencies.title',
    defaultMessage: 'Organizational-level competencies',
    description: 'Organizational competencies section title',
  },
  sectionOrgCompetenciesDescription: {
    id: 'app.competencyFramework.builder.section.orgCompetencies.description',
    defaultMessage: 'Configure organizational-level competencies.',
    description: 'Organizational competencies section description',
  },
  orgCompetenciesTabTitle: {
    id: 'app.competencyFramework.builder.orgCompetencies.title',
    defaultMessage: 'Organizational-level Competencies',
    description: 'Heading for organizational competencies tab',
  },
  orgCompetenciesTabDescription: {
    id: 'app.competencyFramework.builder.orgCompetencies.description',
    defaultMessage: 'Define competencies organized by type, domain, and proficiency level.',
    description: 'Description for organizational competencies tab',
  },
  orgCompetenciesAddType: {
    id: 'app.competencyFramework.builder.orgCompetencies.addType',
    defaultMessage: 'Add Competency Type',
    description: 'Add competency type button label',
  },
  orgCompetenciesAddDomain: {
    id: 'app.competencyFramework.builder.orgCompetencies.addDomain',
    defaultMessage: 'Add Domain',
    description: 'Add domain button label in organizational competencies tab',
  },
  orgCompetenciesAddLevel: {
    id: 'app.competencyFramework.builder.orgCompetencies.addLevel',
    defaultMessage: 'Add Proficiency Level',
    description: 'Add proficiency level button label in organizational competencies tab',
  },
  orgCompetenciesAddCompetency: {
    id: 'app.competencyFramework.builder.orgCompetencies.addCompetency',
    defaultMessage: 'Add Competency',
    description: 'Add competency button label in organizational competencies tab',
  },
  orgCompetenciesTypeLabel: {
    id: 'app.competencyFramework.builder.orgCompetencies.type.label',
    defaultMessage: 'Competency Type',
    description: 'Competency type label in organizational competencies tab',
  },
  orgCompetenciesDomainLabel: {
    id: 'app.competencyFramework.builder.orgCompetencies.domain.label',
    defaultMessage: 'Domain',
    description: 'Domain label in organizational competencies tab',
  },
  orgCompetenciesLevelLabel: {
    id: 'app.competencyFramework.builder.orgCompetencies.level.label',
    defaultMessage: 'Proficiency Level',
    description: 'Proficiency level label in organizational competencies tab',
  },
  orgCompetenciesSelectTypePlaceholder: {
    id: 'app.competencyFramework.builder.orgCompetencies.type.placeholder',
    defaultMessage: 'Select type',
    description: 'Select type placeholder in organizational competencies tab',
  },
  orgCompetenciesSelectDomainPlaceholder: {
    id: 'app.competencyFramework.builder.orgCompetencies.domain.placeholder',
    defaultMessage: 'Select domain',
    description: 'Select domain placeholder in organizational competencies tab',
  },
  orgCompetenciesSelectLevelPlaceholder: {
    id: 'app.competencyFramework.builder.orgCompetencies.level.placeholder',
    defaultMessage: 'Select level',
    description: 'Select level placeholder in organizational competencies tab',
  },
  orgCompetenciesCompetencyPlaceholder: {
    id: 'app.competencyFramework.builder.orgCompetencies.competency.placeholder',
    defaultMessage: 'Enter competency description',
    description: 'Competency description placeholder in organizational competencies tab',
  },
  orgCompetenciesDeleteDialogTitle: {
    id: 'app.competencyFramework.builder.orgCompetencies.deleteDialog.title',
    defaultMessage: 'Delete Item',
    description: 'Delete dialog title in organizational competencies tab',
  },
  orgCompetenciesDeleteDialogDescription: {
    id: 'app.competencyFramework.builder.orgCompetencies.deleteDialog.description',
    defaultMessage: 'Are you sure you want to delete "{name}"?',
    description: 'Delete dialog description in organizational competencies tab',
  },
  orgCompetenciesDeleteDialogCancel: {
    id: 'app.competencyFramework.builder.orgCompetencies.deleteDialog.cancel',
    defaultMessage: 'Cancel',
    description: 'Delete dialog cancel label in organizational competencies tab',
  },
  orgCompetenciesDeleteDialogConfirm: {
    id: 'app.competencyFramework.builder.orgCompetencies.deleteDialog.confirm',
    defaultMessage: 'Delete',
    description: 'Delete dialog confirm label in organizational competencies tab',
  },
  orgCompetenciesDeleteSuccessTitle: {
    id: 'app.competencyFramework.builder.orgCompetencies.delete.success.title',
    defaultMessage: 'Deleted',
    description: 'Delete success toast title in organizational competencies tab',
  },
  orgCompetenciesDeleteSuccessDescription: {
    id: 'app.competencyFramework.builder.orgCompetencies.delete.success.description',
    defaultMessage: 'Item deleted successfully.',
    description: 'Delete success toast description in organizational competencies tab',
  },
  orgCompetenciesDeleteFailedTitle: {
    id: 'app.competencyFramework.builder.orgCompetencies.delete.failed.title',
    defaultMessage: 'Delete failed',
    description: 'Delete failed toast title in organizational competencies tab',
  },
  orgCompetenciesDeleteFailedDescription: {
    id: 'app.competencyFramework.builder.orgCompetencies.delete.failed.description',
    defaultMessage: 'Unable to delete item. Please try again.',
    description: 'Delete failed toast description in organizational competencies tab',
  },
  orgCompetenciesDeleteBlockedDescription: {
    id: 'app.competencyFramework.builder.orgCompetencies.delete.blocked.description',
    defaultMessage: 'At least one item is required in this section.',
    description: 'Delete blocked toast description in organizational competencies tab',
  },
  orgCompetenciesSaveSuccessTitle: {
    id: 'app.competencyFramework.builder.orgCompetencies.save.success.title',
    defaultMessage: 'Saved',
    description: 'Save success toast title in organizational competencies tab',
  },
  orgCompetenciesSaveSuccessDescription: {
    id: 'app.competencyFramework.builder.orgCompetencies.save.success.description',
    defaultMessage: 'Organizational competencies saved successfully.',
    description: 'Save success toast description in organizational competencies tab',
  },
  orgCompetenciesSaveFailedTitle: {
    id: 'app.competencyFramework.builder.orgCompetencies.save.failed.title',
    defaultMessage: 'Save failed',
    description: 'Save failed toast title in organizational competencies tab',
  },
  orgCompetenciesSaveFailedDescription: {
    id: 'app.competencyFramework.builder.orgCompetencies.save.failed.description',
    defaultMessage: 'Unable to save organizational competencies. Please try again.',
    description: 'Save failed toast description in organizational competencies tab',
  },
  roleSpecificAddRole: {
    id: 'app.competencyFramework.builder.roleSpecific.addRole',
    defaultMessage: 'Add Role',
    description: 'Add role button in role-specific competencies tab',
  },
  roleSpecificRoleLabel: {
    id: 'app.competencyFramework.builder.roleSpecific.role.label',
    defaultMessage: 'Role',
    description: 'Role field label in role-specific competencies tab',
  },
  roleSpecificSelectRolePlaceholder: {
    id: 'app.competencyFramework.builder.roleSpecific.role.placeholder',
    defaultMessage: 'Select role',
    description: 'Role dropdown placeholder in role-specific competencies tab',
  },
  roleSpecificCompetencyTypeLabel: {
    id: 'app.competencyFramework.builder.roleSpecific.competencyType.label',
    defaultMessage: 'Competency Type:',
    description: 'Competency type label in role-specific competencies tab',
  },
  roleSpecificCompetencyTypeValue: {
    id: 'app.competencyFramework.builder.roleSpecific.competencyType.value',
    defaultMessage: 'Role-specific competencies',
    description: 'Fixed competency type value in role-specific competencies tab',
  },
  roleSpecificDomainLabel: {
    id: 'app.competencyFramework.builder.roleSpecific.domain.label',
    defaultMessage: 'Domain',
    description: 'Domain field label in role-specific competencies tab',
  },
  roleSpecificSubDomainLabel: {
    id: 'app.competencyFramework.builder.roleSpecific.subDomain.label',
    defaultMessage: 'Sub-Domain',
    description: 'Sub-domain field label in role-specific competencies tab',
  },
  roleSpecificRequireProficiency: {
    id: 'app.competencyFramework.builder.roleSpecific.requireProficiency',
    defaultMessage: 'Require Proficiency Level',
    description: 'Require proficiency checkbox in role-specific competencies tab',
  },
  roleSpecificRequireSubDomain: {
    id: 'app.competencyFramework.builder.roleSpecific.requireSubDomain',
    defaultMessage: 'Require Sub-Domain',
    description: 'Require sub-domain checkbox in role-specific competencies tab',
  },
  roleSpecificAddDomain: {
    id: 'app.competencyFramework.builder.roleSpecific.addDomain',
    defaultMessage: 'Add Domain',
    description: 'Add domain button in role-specific competencies tab',
  },
  roleSpecificAddProficiencyLevel: {
    id: 'app.competencyFramework.builder.roleSpecific.addProficiencyLevel',
    defaultMessage: 'Add Proficiency Level',
    description: 'Add proficiency level button in role-specific competencies tab',
  },
  roleSpecificAddCompetency: {
    id: 'app.competencyFramework.builder.roleSpecific.addCompetency',
    defaultMessage: 'Add Competency',
    description: 'Add competency button in role-specific competencies tab',
  },
  roleSpecificFlatCompetenciesLabel: {
    id: 'app.competencyFramework.builder.roleSpecific.flatCompetencies.label',
    defaultMessage: 'Competencies',
    description: 'Flat competencies section label when proficiency is off',
  },
  roleSpecificSelectDomainPlaceholder: {
    id: 'app.competencyFramework.builder.roleSpecific.domain.placeholder',
    defaultMessage: 'Select domain',
    description: 'Domain dropdown placeholder in role-specific competencies tab',
  },
  roleSpecificSelectSubDomainPlaceholder: {
    id: 'app.competencyFramework.builder.roleSpecific.subDomain.placeholder',
    defaultMessage: 'Select sub-domain',
    description: 'Sub-domain dropdown placeholder in role-specific competencies tab',
  },
  roleSpecificSelectLevelPlaceholder: {
    id: 'app.competencyFramework.builder.roleSpecific.level.placeholder',
    defaultMessage: 'Select level',
    description: 'Proficiency level placeholder in role-specific competencies tab',
  },
  roleSpecificCompetencyPlaceholder: {
    id: 'app.competencyFramework.builder.roleSpecific.competency.placeholder',
    defaultMessage: 'Enter competency description',
    description: 'Competency input placeholder in role-specific competencies tab',
  },
  roleSpecificAddNewDomainTitle: {
    id: 'app.competencyFramework.builder.roleSpecific.addNewDomain.title',
    defaultMessage: 'Add new domain',
    description: 'Title attribute for add domain shortcut in role-specific competencies tab',
  },
  roleSpecificAddNewSubDomainTitle: {
    id: 'app.competencyFramework.builder.roleSpecific.addNewSubDomain.title',
    defaultMessage: 'Add new sub-domain',
    description: 'Title attribute for add sub-domain shortcut in role-specific competencies tab',
  },
  roleSpecificDeleteDialogTitle: {
    id: 'app.competencyFramework.builder.roleSpecific.deleteDialog.title',
    defaultMessage: 'Remove item?',
    description: 'Delete confirmation title in role-specific competencies tab',
  },
  roleSpecificDeleteDialogDescription: {
    id: 'app.competencyFramework.builder.roleSpecific.deleteDialog.description',
    defaultMessage: 'This will remove "{name}" from the framework builder. This action cannot be undone.',
    description: 'Delete confirmation description in role-specific competencies tab',
  },
  roleSpecificDeleteDialogCancel: {
    id: 'app.competencyFramework.builder.roleSpecific.deleteDialog.cancel',
    defaultMessage: 'Cancel',
    description: 'Delete confirmation cancel in role-specific competencies tab',
  },
  roleSpecificDeleteDialogConfirm: {
    id: 'app.competencyFramework.builder.roleSpecific.deleteDialog.confirm',
    defaultMessage: 'Remove',
    description: 'Delete confirmation confirm in role-specific competencies tab',
  },
  roleSpecificDeleteSuccessTitle: {
    id: 'app.competencyFramework.builder.roleSpecific.delete.success.title',
    defaultMessage: 'Removed',
    description: 'Delete success toast title in role-specific competencies tab',
  },
  roleSpecificDeleteSuccessDescription: {
    id: 'app.competencyFramework.builder.roleSpecific.delete.success.description',
    defaultMessage: 'The item was removed.',
    description: 'Delete success toast description in role-specific competencies tab',
  },
  roleSpecificDeleteFailedTitle: {
    id: 'app.competencyFramework.builder.roleSpecific.delete.failed.title',
    defaultMessage: 'Remove failed',
    description: 'Delete failed toast title in role-specific competencies tab',
  },
  roleSpecificDeleteFailedDescription: {
    id: 'app.competencyFramework.builder.roleSpecific.delete.failed.description',
    defaultMessage: 'Unable to remove the item. Please try again.',
    description: 'Delete failed toast description in role-specific competencies tab',
  },
  roleSpecificDeleteBlockedDescription: {
    id: 'app.competencyFramework.builder.roleSpecific.delete.blocked.description',
    defaultMessage: 'You cannot remove the last remaining item in this group.',
    description: 'Delete blocked toast in role-specific competencies tab',
  },
  roleSpecificSaveSuccessTitle: {
    id: 'app.competencyFramework.builder.roleSpecific.save.success.title',
    defaultMessage: 'Saved',
    description: 'Save success toast title in role-specific competencies tab',
  },
  roleSpecificSaveSuccessDescription: {
    id: 'app.competencyFramework.builder.roleSpecific.save.success.description',
    defaultMessage: 'Role-specific competencies were saved.',
    description: 'Save success toast description in role-specific competencies tab',
  },
  roleSpecificSaveFailedTitle: {
    id: 'app.competencyFramework.builder.roleSpecific.save.failed.title',
    defaultMessage: 'Save failed',
    description: 'Save failed toast title in role-specific competencies tab',
  },
  roleSpecificSaveFailedDescription: {
    id: 'app.competencyFramework.builder.roleSpecific.save.failed.description',
    defaultMessage: 'Unable to save role-specific competencies. Please try again.',
    description: 'Save failed toast description in role-specific competencies tab',
  },
  sectionRoleCompetenciesTitle: {
    id: 'app.competencyFramework.builder.section.roleCompetencies.title',
    defaultMessage: 'Role-specific Competencies',
    description: 'Role-specific competencies section title',
  },
  sectionRoleCompetenciesDescription: {
    id: 'app.competencyFramework.builder.section.roleCompetencies.description',
    defaultMessage: 'Define competencies for each role, organized by domain and optionally by proficiency level and sub-domain.',
    description: 'Role-specific competencies section description',
  },
  sectionActivitiesTitle: {
    id: 'app.competencyFramework.builder.section.activities.title',
    defaultMessage: 'Role-specific Activities',
    description: 'Role-specific activities section title',
  },
  sectionActivitiesDescription: {
    id: 'app.competencyFramework.builder.section.activities.description',
    defaultMessage: 'Define activities for each role, organized by domain and optionally by proficiency level and sub-domain.',
    description: 'Role-specific activities section description',
  },
  roleActivitiesAddRole: {
    id: 'app.competencyFramework.builder.roleActivities.addRole',
    defaultMessage: 'Add Role',
    description: 'Add role button in role-specific activities tab',
  },
  roleActivitiesRoleLabel: {
    id: 'app.competencyFramework.builder.roleActivities.role.label',
    defaultMessage: 'Role',
    description: 'Role field label in role-specific activities tab',
  },
  roleActivitiesSelectRolePlaceholder: {
    id: 'app.competencyFramework.builder.roleActivities.role.placeholder',
    defaultMessage: 'Select role',
    description: 'Role dropdown placeholder in role-specific activities tab',
  },
  roleActivitiesDomainLabel: {
    id: 'app.competencyFramework.builder.roleActivities.domain.label',
    defaultMessage: 'Domain',
    description: 'Domain field label in role-specific activities tab',
  },
  roleActivitiesSubDomainLabel: {
    id: 'app.competencyFramework.builder.roleActivities.subDomain.label',
    defaultMessage: 'Sub-Domain',
    description: 'Sub-domain field label in role-specific activities tab',
  },
  roleActivitiesRequireProficiency: {
    id: 'app.competencyFramework.builder.roleActivities.requireProficiency',
    defaultMessage: 'Require Proficiency Level',
    description: 'Require proficiency checkbox in role-specific activities tab',
  },
  roleActivitiesRequireSubDomain: {
    id: 'app.competencyFramework.builder.roleActivities.requireSubDomain',
    defaultMessage: 'Require Sub-Domain',
    description: 'Require sub-domain checkbox in role-specific activities tab',
  },
  roleActivitiesAddDomain: {
    id: 'app.competencyFramework.builder.roleActivities.addDomain',
    defaultMessage: 'Add Domain',
    description: 'Add domain button in role-specific activities tab',
  },
  roleActivitiesAddProficiencyLevel: {
    id: 'app.competencyFramework.builder.roleActivities.addProficiencyLevel',
    defaultMessage: 'Add Proficiency Level',
    description: 'Add proficiency level button in role-specific activities tab',
  },
  roleActivitiesAddActivity: {
    id: 'app.competencyFramework.builder.roleActivities.addActivity',
    defaultMessage: 'Add Activity',
    description: 'Add activity button in role-specific activities tab',
  },
  roleActivitiesFlatSectionLabel: {
    id: 'app.competencyFramework.builder.roleActivities.flatSection.label',
    defaultMessage: 'Activities',
    description: 'Flat activities section label when proficiency is off',
  },
  roleActivitiesSelectDomainPlaceholder: {
    id: 'app.competencyFramework.builder.roleActivities.domain.placeholder',
    defaultMessage: 'Select domain',
    description: 'Domain dropdown placeholder in role-specific activities tab',
  },
  roleActivitiesSelectSubDomainPlaceholder: {
    id: 'app.competencyFramework.builder.roleActivities.subDomain.placeholder',
    defaultMessage: 'Select sub-domain',
    description: 'Sub-domain dropdown placeholder in role-specific activities tab',
  },
  roleActivitiesSelectLevelPlaceholder: {
    id: 'app.competencyFramework.builder.roleActivities.level.placeholder',
    defaultMessage: 'Select level',
    description: 'Proficiency level placeholder in role-specific activities tab',
  },
  roleActivitiesActivityPlaceholder: {
    id: 'app.competencyFramework.builder.roleActivities.activity.placeholder',
    defaultMessage: 'Describe activity',
    description: 'Activity input placeholder in role-specific activities tab',
  },
  roleActivitiesAddNewDomainTitle: {
    id: 'app.competencyFramework.builder.roleActivities.addNewDomain.title',
    defaultMessage: 'Add new domain',
    description: 'Title attribute for add domain shortcut in role-specific activities tab',
  },
  roleActivitiesAddNewSubDomainTitle: {
    id: 'app.competencyFramework.builder.roleActivities.addNewSubDomain.title',
    defaultMessage: 'Add new sub-domain',
    description: 'Title attribute for add sub-domain shortcut in role-specific activities tab',
  },
  roleActivitiesDeleteDialogTitle: {
    id: 'app.competencyFramework.builder.roleActivities.deleteDialog.title',
    defaultMessage: 'Remove item?',
    description: 'Delete confirmation title in role-specific activities tab',
  },
  roleActivitiesDeleteDialogDescription: {
    id: 'app.competencyFramework.builder.roleActivities.deleteDialog.description',
    defaultMessage: 'This will remove "{name}" from the framework builder. This action cannot be undone.',
    description: 'Delete confirmation description in role-specific activities tab',
  },
  roleActivitiesDeleteDialogCancel: {
    id: 'app.competencyFramework.builder.roleActivities.deleteDialog.cancel',
    defaultMessage: 'Cancel',
    description: 'Delete confirmation cancel in role-specific activities tab',
  },
  roleActivitiesDeleteDialogConfirm: {
    id: 'app.competencyFramework.builder.roleActivities.deleteDialog.confirm',
    defaultMessage: 'Remove',
    description: 'Delete confirmation confirm in role-specific activities tab',
  },
  roleActivitiesDeleteSuccessTitle: {
    id: 'app.competencyFramework.builder.roleActivities.delete.success.title',
    defaultMessage: 'Removed',
    description: 'Delete success toast title in role-specific activities tab',
  },
  roleActivitiesDeleteSuccessDescription: {
    id: 'app.competencyFramework.builder.roleActivities.delete.success.description',
    defaultMessage: 'The item was removed.',
    description: 'Delete success toast description in role-specific activities tab',
  },
  roleActivitiesDeleteFailedTitle: {
    id: 'app.competencyFramework.builder.roleActivities.delete.failed.title',
    defaultMessage: 'Remove failed',
    description: 'Delete failed toast title in role-specific activities tab',
  },
  roleActivitiesDeleteFailedDescription: {
    id: 'app.competencyFramework.builder.roleActivities.delete.failed.description',
    defaultMessage: 'Unable to remove the item. Please try again.',
    description: 'Delete failed toast description in role-specific activities tab',
  },
  roleActivitiesDeleteBlockedDescription: {
    id: 'app.competencyFramework.builder.roleActivities.delete.blocked.description',
    defaultMessage: 'You cannot remove the last remaining item in this group.',
    description: 'Delete blocked toast in role-specific activities tab',
  },
  roleActivitiesSaveSuccessTitle: {
    id: 'app.competencyFramework.builder.roleActivities.save.success.title',
    defaultMessage: 'Saved',
    description: 'Save success toast title in role-specific activities tab',
  },
  roleActivitiesSaveSuccessDescription: {
    id: 'app.competencyFramework.builder.roleActivities.save.success.description',
    defaultMessage: 'Role-specific activities were saved.',
    description: 'Save success toast description in role-specific activities tab',
  },
  roleActivitiesSaveFailedTitle: {
    id: 'app.competencyFramework.builder.roleActivities.save.failed.title',
    defaultMessage: 'Save failed',
    description: 'Save failed toast title in role-specific activities tab',
  },
  roleActivitiesSaveFailedDescription: {
    id: 'app.competencyFramework.builder.roleActivities.save.failed.description',
    defaultMessage: 'Unable to save role-specific activities. Please try again.',
    description: 'Save failed toast description in role-specific activities tab',
  },
  frameworkTabWho: {
    id: 'app.competencyFramework.frameworkTabs.who',
    defaultMessage: 'WHO Global Competency Framework',
    description: 'WHO competency framework tab label',
  },
  frameworkTabSearn: {
    id: 'app.competencyFramework.frameworkTabs.searn',
    defaultMessage: 'SEARN Competency Framework',
    description: 'SEARN competency framework tab label',
  },
  frameworkTabNraSpecific: {
    id: 'app.competencyFramework.frameworkTabs.nraSpecific',
    defaultMessage: 'NRA Specific Competency Framework',
    description: 'NRA specific competency framework tab label',
  },
  tabSuggestions: {
    id: 'app.competencyFramework.builder.tab.suggestions',
    defaultMessage: 'Suggestions',
    description: 'Suggestions tab label in create mode',
  },
  suggestionsSubtitle: {
    id: 'app.competencyFramework.suggestions.subtitle',
    defaultMessage: 'Submit suggestions for new competencies, activities, domains, or sub-domains.',
    description: 'Suggestions tab subtitle',
  },
  addSuggestion: {
    id: 'app.competencyFramework.suggestions.add.button',
    defaultMessage: 'Add Suggestion',
    description: 'Add suggestion button label',
  },
  suggestionModalTitleAdd: {
    id: 'app.competencyFramework.suggestions.modal.add.title',
    defaultMessage: 'Add Suggestion',
    description: 'Add suggestion modal title',
  },
  suggestionModalTitleEdit: {
    id: 'app.competencyFramework.suggestions.modal.edit.title',
    defaultMessage: 'Edit Suggestion',
    description: 'Edit suggestion modal title',
  },
  suggestionTypeLabel: {
    id: 'app.competencyFramework.suggestions.form.type.label',
    defaultMessage: 'Suggestion Type',
    description: 'Suggestion type field label',
  },
  suggestionNameLabel: {
    id: 'app.competencyFramework.suggestions.form.name.label',
    defaultMessage: 'Suggestion Name',
    description: 'Suggestion name field label',
  },
  suggestionDescriptionLabel: {
    id: 'app.competencyFramework.suggestions.form.description.label',
    defaultMessage: 'Suggestion Description',
    description: 'Suggestion description field label',
  },
  suggestionStatusLabel: {
    id: 'app.competencyFramework.suggestions.form.status.label',
    defaultMessage: 'Suggestion Status',
    description: 'Suggestion status field label',
  },
  suggestionNamePlaceholder: {
    id: 'app.competencyFramework.suggestions.form.name.placeholder',
    defaultMessage: 'Enter suggestion name',
    description: 'Suggestion name placeholder',
  },
  suggestionDescriptionPlaceholder: {
    id: 'app.competencyFramework.suggestions.form.description.placeholder',
    defaultMessage: 'Enter description',
    description: 'Suggestion description placeholder',
  },
  cancel: {
    id: 'app.competencyFramework.suggestions.form.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button label',
  },
  add: {
    id: 'app.competencyFramework.suggestions.form.add',
    defaultMessage: 'Add',
    description: 'Add button label',
  },
  save: {
    id: 'app.competencyFramework.suggestions.form.save',
    defaultMessage: 'Save',
    description: 'Save button label',
  },
  suggestionTypeCompetency: {
    id: 'app.competencyFramework.suggestions.type.competency',
    defaultMessage: 'Competency',
    description: 'Suggestion type option - Competency',
  },
  suggestionTypeDomain: {
    id: 'app.competencyFramework.suggestions.type.domain',
    defaultMessage: 'Domain',
    description: 'Suggestion type option - Domain',
  },
  suggestionTypeSubDomain: {
    id: 'app.competencyFramework.suggestions.type.subDomain',
    defaultMessage: 'Sub-domain',
    description: 'Suggestion type option - Sub-domain',
  },
  suggestionTypeActivity: {
    id: 'app.competencyFramework.suggestions.type.activity',
    defaultMessage: 'Activity',
    description: 'Suggestion type option - Activity',
  },
  suggestionStatusPending: {
    id: 'app.competencyFramework.suggestions.status.pending',
    defaultMessage: 'Pending',
    description: 'Suggestion status option - Pending',
  },
  suggestionStatusApproved: {
    id: 'app.competencyFramework.suggestions.status.approved',
    defaultMessage: 'Approved',
    description: 'Suggestion status option - Approved',
  },
  suggestionDeleteDialogTitle: {
    id: 'app.competencyFramework.suggestions.delete.dialog.title',
    defaultMessage: 'Delete suggestion?',
    description: 'Delete suggestion confirmation title',
  },
  suggestionDeleteDialogDescription: {
    id: 'app.competencyFramework.suggestions.delete.dialog.description',
    defaultMessage: 'This will permanently remove "{name}".',
    description: 'Delete suggestion confirmation description',
  },
  suggestionDeleteConfirmLabel: {
    id: 'app.competencyFramework.suggestions.delete.dialog.confirm',
    defaultMessage: 'Delete',
    description: 'Delete suggestion confirmation confirm button label',
  },
  suggestionDeletedToastTitle: {
    id: 'app.competencyFramework.suggestions.delete.toast.title',
    defaultMessage: 'Suggestion deleted',
    description: 'Delete suggestion success toast title',
  },
  suggestionDeletedToastDescription: {
    id: 'app.competencyFramework.suggestions.delete.toast.description',
    defaultMessage: '"{name}" deleted successfully.',
    description: 'Delete suggestion success toast description',
  },
  suggestionSavedToastTitle: {
    id: 'app.competencyFramework.suggestions.save.toast.title',
    defaultMessage: 'Suggestion saved',
    description: 'Add/edit suggestion success toast title',
  },
  suggestionSavedToastDescription: {
    id: 'app.competencyFramework.suggestions.save.toast.description',
    defaultMessage: 'Your suggestion has been saved successfully.',
    description: 'Add/edit suggestion success toast description',
  },
  readOnlyBannerText: {
    id: 'app.competencyFramework.builder.readOnly.banner',
    defaultMessage: 'This section is read-only. Use the Suggestions tab to propose changes to the Secretariat.',
    description: 'Read-only banner shown in view mode on builder pages',
  },
});

export default competencyFrameworkMessages;
