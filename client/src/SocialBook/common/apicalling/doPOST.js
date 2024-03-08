import { apis } from "../../service/constant";

async function doPOST(endpoint, bodyContent) {
  const response = await fetch(apis.baseUrl + endpoint, {
    method: "POST",
    body: JSON.stringify(bodyContent),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  const resJosn = await response.json();
  return resJosn;
}

async function doPOSTWithToken(endpoint, bodyContent) {
  const response = await fetch(apis.baseUrl + endpoint, {
    method: "POST",
    body: JSON.stringify(bodyContent),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    },
  });
  const resJosn = await response.json();
  return resJosn;
}

async function doGETWithToken(endpoint, bodyContent) {
  const response = await fetch(apis.baseUrl + endpoint, {
    method: "GET",
    body: JSON.stringify(bodyContent),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + sessionStorage.getItem("jwt"),
    },
  });
  const resJosn = await response.json();
  return resJosn;
}

export { doPOST, doPOSTWithToken, doGETWithToken };
