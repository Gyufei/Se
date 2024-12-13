export function covertErrorMsg(e: any, placeholder: string) {
  if (!e.message) return placeholder;

  if (e.message.includes("User rejected the request")) {
    return "User rejected the request.";
  }

  if (e.message.length > 40) return e.message.slice(0, 40) + "...";

  return e.message;
}
