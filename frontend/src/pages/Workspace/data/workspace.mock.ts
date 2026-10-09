import type { UserIdentity, SelectionOption } from '../types/workspace.types'

export const MOCK_USER_IDENTITY: UserIdentity = {
  email: 'alex.morgan@auraspatial.com',
  status: 'verified',
}

export const SELECTION_OPTIONS: SelectionOption[] = [
  {
    id: 'create',
    title: 'Create a Workspace',
    description: 'Create a new team, invite collaborators, and start managing your projects.',
    actionText: 'Get started',
    colorTheme: 'indigo',
    iconName: 'Building2',
  },
  {
    id: 'invite',
    title: 'Wait for an Invite',
    description: 'Check your pending invitations to join an existing team\'s workspace.',
    actionText: 'Check status',
    colorTheme: 'violet',
    iconName: 'MailOpen',
  }
]
