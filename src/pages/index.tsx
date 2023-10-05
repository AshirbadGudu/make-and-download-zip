import JSZip from "jszip";

const images = [
  "https://images.pexels.com/photos/18059778/pexels-photo-18059778.jpeg",
  "https://images.pexels.com/photos/16227905/pexels-photo-16227905/free-photo-of-art-pattern-texture-abstract.jpeg",
];

export default function Home() {
  const handleDownload = async () => {
    const zip = new JSZip();

    // Loop through the images array and add each image to the ZIP archive
    for (const imageUrl of images) {
      // Fetch the image as a blob
      const response = await fetch(imageUrl);
      const imageBlob = await response.blob();

      // Extract the filename from the URL (assuming it's the last part after '/')
      const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

      // Add the blob to the ZIP archive with the extracted filename
      zip.file(filename, imageBlob);
    }

    // Generate the ZIP file
    const zipBlob = await zip.generateAsync({ type: "blob" });

    // Create a download link and trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(zipBlob);
    downloadLink.download = "images.zip";
    downloadLink.click();
  };

  return (
    <main className="">
      <figure
        style={{ background: "#fff", display: "flex", gap: 10, padding: 10 }}
      >
        {images.map((imageUrl, i) => (
          <img
            key={i}
            src={imageUrl}
            style={{ width: 100, height: 100 }}
            alt=""
          />
        ))}
      </figure>
      <button onClick={handleDownload}>Download</button>
    </main>
  );
}
