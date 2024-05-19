export const commonAxiosConfig = (config) => {
  config.baseURL = "http://localhost:8080/api/"
  //Czy są parametry do dodania do URL
  if(config.appendParams) {
    const url = new URL(config.url, config.baseURL); //URL bez paramów
    Object.keys(config.appendParams).forEach(key => {
      config.params = {...config.params, [key]: config.appendParams[key]}
      //url.searchParams.append(key, config.appendParams[key]);
    });
    //config.
  }

  return config;
}

