export const USER_ROLE = {
  superAdmin: 'superAdmin',
  client: 'client',
  admin: 'admin',
} as const;


export const usersSearchableFields = [
  'email',
  'address',
];

export const UserStatus = ['active', 'blocked'];
