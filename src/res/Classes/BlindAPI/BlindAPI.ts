import { ICredentials } from "../../Interfaces";

type VALID_METHOD = "GET" | "POST";
class BlindAPI {
  private credentials: ICredentials;

  constructor(credentials: ICredentials) {
    this.credentials = credentials;
  }

  async createFetch(
    endpoint: string,
    method: VALID_METHOD,
    body?: any
  ): Promise<Response> {
    let requestInit: RequestInit = {};
    switch (method) {
      case "GET":
        requestInit = {
          method: method,
          mode: "cors",
          headers: {
            "Content-Type": "text/json",
            Auth: this.credentials.password
          }
          // body: body
        };
        break;
      case "POST":
        requestInit = {
          method: method,
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Auth: this.credentials.password
          },
          body: body
        };
        break;
    }
    console.log(this.credentials.address + endpoint, requestInit);
    return fetch(this.credentials.address + endpoint, requestInit);
  }
}

export default BlindAPI;
