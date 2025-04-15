import { useSearchTextContext } from "../lib/context_hooks";

export default function SearchForm() {
  const { searchText, handleChangeSearchText } = useSearchTextContext();
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeSearchText(event.target.value);
  };

  return (
    <form onSubmit={submitHandler} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange={changeHandler}
        value={searchText}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
