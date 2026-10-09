export const VIEW_TITLES = {
  selection: 'Welcome to TaskTMS',
  create: 'Name your Workspace',
  invite: 'Join Existing Workspace',
} as const

export const VIEW_SUBTITLES = {
  selection: 'Get started by creating a new workspace or joining an existing one.',
  create: '',
  invite: 'You will gain access once you accept an invitation from a workspace admin.',
} as const

export const WORKSPACE_TEXTS = {
  backToOptions: 'Back to options',
  create: {
    workspaceNameLabel: 'Workspace Name',
    workspaceNamePlaceholder: 'e.g. Engineering Team, Marketing',
    submit: 'Create Workspace',
    submitting: 'Creating...',
    cancel: 'Cancel',
  },
  invite: {
    awaitingTitle: 'Awaiting Workspace Invitation',
    awaitingDesc: 'Check your email inbox for an invitation link, or contact your workspace administrator to invite you.',
    loggedInAs: 'Logged in as:',
    checkInvitesBtn: 'Check for invitations',
    queryingBtn: 'Checking...',
    noInvitesMsg: 'No pending invites found for this email.',
  }
} as const
