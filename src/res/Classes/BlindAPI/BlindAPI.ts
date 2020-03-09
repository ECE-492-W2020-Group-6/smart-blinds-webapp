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
    body?: string
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
            "Content-Type": "text/json",
            Auth: this.credentials.password
          },
          body: body
        };
        break;
    }

    return fetch(this.credentials.address + endpoint, requestInit);
  }
}

export default BlindAPI;
