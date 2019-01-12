const CHOICES = [
  "Asia",
  "Australia",
  "Western Europe",
  "North America",
  "Eastern Europe",
  "Latin America",
  "Middle East"
];

export const ApiService = {
  fetchData() {
    return {
      label: "Sales Region",
      required: false,
      choices: CHOICES,
      displayAlpha: false,
      defaultValue: "North America"
    };
  },

  postData(fieldJson, url) {
    return fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      method: "post",
      body: JSON.stringify(fieldJson)
    });
  }
}
