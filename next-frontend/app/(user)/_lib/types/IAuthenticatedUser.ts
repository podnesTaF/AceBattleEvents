export interface AuthenticatedUser {
  id: number;
  email: string;
  roles: RequestRole[];
  token: string;
  ott?: string;
}

export interface RequestRole {
  id: number;
  name: string;
  active: boolean;
}

export interface OTT {
  id: number;
  ott: string;
  jwtToken: string;
  expiresAt: string;
  user: AuthenticatedUser;
}
