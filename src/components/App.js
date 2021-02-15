import React, { Component } from "react";
import Loader from "react-loader-spinner";

import imagesApi from "../services/imagesApi";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./App.module.css";

export default class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    searchQuery: "",
    page: 1,
    showModal: false,
    largeImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }
    if (this.state.page > 2 && prevState.page !== this.state.page) {
      this.smoothScrol();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true });
    imagesApi
      .fetchImagesWithQuery(searchQuery, page)
      .then((images) =>
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }))
      )
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchFormSubmit = (query) => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
      error: null,
      showModal: false,
    });
  };

  handleClickImage = (largeImageURL) => {
    this.openModal(largeImageURL);
  };

  openModal = (largeImageURL) =>
    this.setState({ showModal: true, largeImage: largeImageURL });

  closeModal = () => this.setState({ showModal: false, largeImage: "" });

  smoothScrol = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  render() {
    const { images, loading, error, showModal, largeImage } = this.state;
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}

        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.handleClickImage} />
        )}

        {showModal && (
          <Modal largeImageURL={largeImage} closeModal={this.closeModal} />
        )}

        {loading && (
          <div className={s.loader}>
            <Loader type="Oval" color="#00BFFF" height={30} width={30} />
          </div>
        )}
        {images.length > 0 && !loading && <Button onClick={this.fetchImages} />}
      </div>
    );
  }
}
