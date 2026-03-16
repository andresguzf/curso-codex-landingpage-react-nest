export type AuthUser = {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  user: AuthUser;
};
