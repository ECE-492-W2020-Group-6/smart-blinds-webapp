import { ICredentials } from "../../Interfaces";

const API_ENDPOINT = "/api/v1";

type VALID_METHOD = "GET" | "POST" | "DELETE";
class BlindAPI {
  private credentials: ICredentials;
  private jwt: string;

  constructor(credentials: ICredentials) {
    this.credentials = credentials;
    this.jwt = "";
    this.getJWT();
  }

  async getJWT() {
    let requestInit: RequestInit = {};

    requestInit = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: `Basic ${btoa(
          this.credentials.username + ":" + this.credentials.password
        )}`,
      },
    };

    let response = await fetch(
      this.credentials.address + "/login",
      requestInit
    );
    let responseJSON = await response.clone().json();
    this.jwt = responseJSON.token;
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
            "x-access-token": this.jwt,
            // Auth: this.credentials.password,
          },
          // body: body
        };
        break;
      case "POST":
        requestInit = {
          method: method,
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.jwt,
            // Auth: this.credentials.password,
          },
          body: body,
        };
        break;
      case "DELETE":
        requestInit = {
          method: method,
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.jwt,
            // Auth: this.credentials.password,
          },
        };
        break;
    }
    // console.log(
    //   this.credentials.address + API_ENDPOINT + endpoint,
    //   requestInit
    // );
    let fetchResp = fetch(
      this.credentials.address + API_ENDPOINT + endpoint,
      requestInit
    );
    if ((await fetchResp).status === 200) {
      return fetchResp;
    } else {
      await this.getJWT();
      return fetch(
        this.credentials.address + API_ENDPOINT + endpoint,
        requestInit
      );
    }
  }
}

export default BlindAPI;
