import Modal from "react-modal"
import styles from "./ImageModal.module.css"
const ImageModal = ({ image, onClose }) => {
    if (!image) return null

    return (
      <Modal
        key={image.id}
        isOpen={!!image}
        onRequestClose={onClose}
        contentLabel="Image Modal"
        appElement={document.getElementById("root")}
        className={styles.imageModal}
        overlayClassName={styles.imageModalOverlay}
      >
        <div>
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className={styles.imageModalContent}
          />
        </div>
      </Modal>
    )
}

export default ImageModal
