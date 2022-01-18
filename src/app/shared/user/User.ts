export class User {
  _id: String | undefined;
  name: String | undefined;
  email: String | undefined;
  password: String | undefined;

  constructor( email?: string, password?: string, name?: string, id?: string,) {
    this.email = email;
    this.password = password;
    this.name = name;
  }

}
