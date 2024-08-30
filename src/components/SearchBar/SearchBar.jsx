import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import styles from "./SearchBar.module.css"

const SearchBar = ({ onSubmit }) => {
  const [input, setInput] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(input)
  }

  return (
    <header className={styles.searchbarHeader}>
      <form className={styles.searchbarForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.searchbarButton}>
          <FaSearch className={styles.searchIcon} />
        </button>
        <input
          className={styles.searchbarInput}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search images and photos"
          autoFocus
        />
      </form>
    </header>
  )
}

export default SearchBar
