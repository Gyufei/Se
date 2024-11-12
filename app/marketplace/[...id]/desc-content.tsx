export default function DescContent() {
  const descTitle = "Meet CryptoPunk 8857";
  const desc =
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditis praesentiumvoluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecaticupiditate non provident, similigue sunt in culpa qui officia deserunt mollitia animi, id est laborumet dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.";

  return (
    <div className="flex flex-col mt-10">
      <div className="text-lg text-white">{descTitle}</div>
      <div className="text-white text-xs mt-5 opacity-80">{desc}</div>
    </div>
  );
}
