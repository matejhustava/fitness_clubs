import { memo } from 'react';
import classes from './SearchInput.module.css';

const debounceTime = 500;

const SearchInput = memo((props: { placeholder: string, searchChanged: (value: string) => void}) => {
  const debouncedOnChange = (onChange: (value: string) => void) => {
    let timeout: NodeJS.Timeout;
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const form = e.currentTarget.value;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, debounceTime);
    };
  };

  return (
    <input
      className={classes['search-input']}
      placeholder={props.placeholder}
      onChange={debouncedOnChange((value: string) => props.searchChanged(value))}
    ></input>
  );
});

export default SearchInput;