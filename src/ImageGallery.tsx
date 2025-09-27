import React from "react";

interface ImageGalleryProps {
  imageUrls?: string[];
  height?: number;
}

interface ImageGalleryState {
  selected?: string;
}

const styles: Record<string, React.CSSProperties> = {
  scroller: {
    minHeight: "100px",
    overflowX: "scroll",
    overflowY: "hidden",
    whiteSpace: "nowrap",
  },
  image: {
    display: "inline-block",
    padding: "1%",
    borderRadius: "20px",
    opacity: 0.9,
    transition: "all .2s",
    cursor: "pointer",
  },
};

class ImageGallery extends React.Component<ImageGalleryProps, ImageGalleryState> {
  constructor(props: ImageGalleryProps) {
    super(props);
    this.state = { selected: undefined };
  }

  handleClick = (url: string) => {
    this.setState({ selected: url });
  };

  render() {
    const { imageUrls = [], height = 150 } = this.props;
    const { selected } = this.state;

    return (
      <div style={styles.scroller}>
        {imageUrls.map((url) => (
          <img
            key={url}
            src={url}
            alt=""
            style={{
              ...styles.image,
              height: `${height}px`,
              border: selected === url ? "3px solid #4a90e2" : "none",
            }}
            onClick={() => this.handleClick(url)}
          />
        ))}
      </div>
    );
  }
}

export default ImageGallery;
