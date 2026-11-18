export interface Iuser {
  name: string;
  email: string;
  password: string;
  age?: number | null;
}

// export interface UpUser {
//   name: string;
//   email: string;
//   password: string;
//   age?: number | null;
//   is_Active: boolean;
// }

export interface UpUser extends Iuser {
  is_Active: boolean;
}
