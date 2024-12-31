export default function SearchInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <input
      type="text"
      placeholder="🔍 Search"
      className="h-12 w-[50%] bg-[#382743] px-5 text-white md:w-[190px]"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
