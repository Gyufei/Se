export default function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder="🔍 Search"
      className="w-[190px] h-12 px-5 bg-[#382743] text-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
