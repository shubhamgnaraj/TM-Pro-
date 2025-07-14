export function getTokenId() {
  const token = localStorage.getItem("token");

  const base1 = token.split(".")[1];
  const base64 = base1.replace(/-/g, "+").replace(/_/g, "/");
  const payload = JSON.parse(atob(base64));

  return payload.id;
}
