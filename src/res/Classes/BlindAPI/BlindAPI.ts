import { ICredentials } from "../../Interfaces";

class BlindAPI {
  private credentials: ICredentials;

  constructor(credentials: ICredentials) {
    this.credentials = credentials;
  }

  async createFetch(body: any): Promise<Response> {
    let requestInit: RequestInit = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/json",
        Auth: this.credentials.password
      },
      body: body
    };
    return fetch(this.credentials.address, requestInit);
  }
}

export default BlindAPI;
