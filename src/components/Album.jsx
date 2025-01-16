const Album = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-xl font-bold mb-4">Recuerdos</h3>
    <div className="grid grid-cols-2 gap-4">
      <img
        src="https://via.placeholder.com/150"
        alt="Foto 1"
        className="w-full h-auto rounded"
      />
      <img
        src="https://via.placeholder.com/150"
        alt="Foto 2"
        className="w-full h-auto rounded"
      />
      <video controls className="w-full h-auto rounded">
        <source src="https://via.placeholder.com/video.mp4" type="video/mp4" />
      </video>
      <video controls className="w-full h-auto rounded">
        <source src="https://via.placeholder.com/video.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
);

export default Album;
