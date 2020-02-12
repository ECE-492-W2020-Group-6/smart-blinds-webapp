interface IConfig {
  root: string;
  defaultPath: string;
  mainTitle: string;
  MOTORMIDPOINT: number;
}

const config: IConfig = {
  root: "/smart-blinds-webapp",
  defaultPath: "/",
  mainTitle: "Smart Blinds",
  MOTORMIDPOINT: 50
};

export default config;
