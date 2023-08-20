const baseUrl = import.meta.env.PUBLIC_API_URL;

export function questionApi(endPoint: string, options: any) {
  return fetch(`${baseUrl}${endPoint}`, options).then((res) => res.json());
}
