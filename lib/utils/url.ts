export function removeQueryParams(paramsToRemove: string[]) {
  const currentUrl = new URL(window.location.href);
  const searchParams = currentUrl.searchParams;
  paramsToRemove.forEach((param) => {
    searchParams.delete(param);
  });
  currentUrl.search = searchParams.toString();

  window.history.replaceState({}, document.title, currentUrl.href);
}

export function escapeHtml(unsafe: string) {
  return unsafe.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
