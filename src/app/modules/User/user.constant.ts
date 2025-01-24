export const USER_ROLE = {
  superAdmin: 'superAdmin',
  client: 'client',
  admin: 'admin',
  supervisor: 'supervisor',
  technician: 'technician',
} as const;


export const usersSearchableFields = [
  'email',
  'address',
];

export const UserStatus = ['active', 'blocked'];
