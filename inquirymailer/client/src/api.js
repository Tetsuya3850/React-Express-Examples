export async function sendInquiry(new_inquiry) {
  const response = await fetch("/inquiry", {
    method: "post",
    body: JSON.stringify(new_inquiry),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  return await response.json();
}
