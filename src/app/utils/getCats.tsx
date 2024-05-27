async function getData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
    },
  };

  const response = fetch(
    "https://api.thecatapi.com/v1/images/search?limit=24",
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}

export default async function getCats() {
  const data = await getData();
  return data;
}
