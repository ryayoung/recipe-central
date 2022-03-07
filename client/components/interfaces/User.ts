// Maintainer:     Ryan Young
// Last Modified:  Mar 06, 2022

interface FullName {
    first : string;
    last : string;
}

export interface User {
  _id: string;
  name: FullName;
    email : string;
    created_at : Date;
    updated_at : Date;
  __v: number;
}
