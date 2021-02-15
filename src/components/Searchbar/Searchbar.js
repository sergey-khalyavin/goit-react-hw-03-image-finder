import React, { Component } from "react";

import s from "./Searchbar.module.css";

export default class Searchbar extends Component {
  state = { inputValue: "" };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: "" });
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.searchFormButton}>
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.searchFormInput}
            type="text"
            onChange={this.handleChange}
            value={this.state.inputValue}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
