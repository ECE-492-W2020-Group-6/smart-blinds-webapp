import { ICredentials } from "../../Interfaces";

class BlindAPI {
  private credentials: ICredentials;

  constructor(credentials: ICredentials) {
    this.credentials = credentials;
  }

  async createFetch(endpoint: string): Promise<Response> {
    let requestInit: RequestInit = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "text/json",
        Auth: this.credentials.password
      }
      // body: body
    };
    return fetch(this.credentials.address + endpoint, requestInit);
  }
}

export default BlindAPI;
