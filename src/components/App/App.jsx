import { useState } from "react"
import axios from "axios"
import SearchBar from "../SearchBar/SearchBar"
import ImageGallery from "../ImageGallery/ImageGallery"
import Loader from "../Loader/Loader"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn"
import ImageModal from "../ImageModal/ImageModal"
import { Toaster, toast } from "react-hot-toast"
import "./App.css"

function App() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const [selectedImage, setSelectedImage] = useState(null)

  const fetchImages = async (searchQuery, pageNumber) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: searchQuery,
            page: pageNumber,
            per_page: 12,
            client_id: "NxZbugNPTlsPrGncRZ_Mky9qQcL5LoLWmzImHAPOaZg",
          },
        }
      )
      setImages((prevImages) => [...prevImages, ...response.data.results])
      setPage(pageNumber)
    } catch (err) {
      setError("Failed to fetch images. Please try again." + err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchSubmit = (searchQuery) => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term")
      return
    }
    setQuery(searchQuery)
    setImages([])
    setPage(1)
    fetchImages(searchQuery, 1)
  };

  const handleLoadMore = () => {
    fetchImages(query, page + 1)
  }

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 &&<ImageGallery images={images} onImageClick={setSelectedImage} />}
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
      <Toaster />
    </div>
  )
}

export default App
