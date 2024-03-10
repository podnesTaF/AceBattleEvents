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
