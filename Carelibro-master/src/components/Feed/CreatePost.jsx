import React, { useState, useRef } from 'react';
import { useSocial } from '../../context/SocialContext';
import { sampleVideos, photoGallery } from '../../data/initialData';

export default function CreatePost() {
  const { currentUser, addPost } = useSocial();
  const [content, setContent] = useState('');
  const [mediaType, setMediaType] = useState(null); // 'photo' | 'video' | null
  const [mediaPreview, setMediaPreview] = useState(null); // URL para vista previa
  const [mediaUrl, setMediaUrl] = useState('');
  const [showSamples, setShowSamples] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Manejar selección de archivo desde la computadora (imagen o video)
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video');

    if (isVideo) {
      const fileUrl = URL.createObjectURL(file);
      setMediaType('video');
      setMediaPreview(fileUrl);
      setMediaUrl(fileUrl);
      setErrorMessage('');
      setShowSamples(false);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setMediaType('photo');
        setMediaPreview(dataUrl);
        setMediaUrl(dataUrl);
        setErrorMessage('');
        setShowSamples(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Seleccionar foto de muestra
  const handleSelectSamplePhoto = (url) => {
    setMediaType('photo');
    setMediaPreview(url);
    setMediaUrl(url);
    setErrorMessage('');
  };

  // Seleccionar vídeo de muestra
  const handleSelectSampleVideo = (url) => {
    setMediaType('video');
    setMediaPreview(url);
    setMediaUrl(url);
    setErrorMessage('');
  };

  // Aplicar URL manual
  const handleManualUrl = (url, type) => {
    if (!url.trim()) return;
    setMediaType(type);
    setMediaPreview(url.trim());
    setMediaUrl(url.trim());
    setErrorMessage('');
  };

  // Quitar archivo adjunto
  const handleRemoveMedia = () => {
    setMediaType(null);
    setMediaPreview(null);
    setMediaUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Enviar publicación
  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const trimmedContent = content.trim();

    // Validación clara
    if (!trimmedContent && !mediaUrl) {
      setErrorMessage('⚠️ Escribe un mensaje o adjunta una foto/vídeo para poder publicar.');
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
      return;
    }

    let images = [];
    let video = null;

    if (mediaType === 'photo' && mediaUrl) {
      images = [mediaUrl];
    } else if (mediaType === 'video' && mediaUrl) {
      video = {
        url: mediaUrl,
        poster: 'https://www.w3schools.com/w3images/nature.jpg'
      };
    }

    // Llamada a la acción del contexto global
    addPost({
      content: trimmedContent,
      images,
      video
    });

    // Limpiar formulario tras publicar
    setContent('');
    handleRemoveMedia();
    setShowSamples(false);
    setErrorMessage('');
  };

  return (
    <div className="fb-create-card">
      {/* Cabecera con avatar y nombre */}
      <div className="fb-create-header">
        <img
          src={currentUser.currentUserAvatar}
          alt={currentUser.name}
          className="fb-avatar"
        />
        <div>
          <strong style={{ fontSize: '15px', color: '#050505', display: 'block' }}>
            {currentUser.name}
          </strong>
          <span style={{ fontSize: '12px', color: '#65676b' }}>
            <i className="fa fa-globe"></i> Compartir con: Público
          </span>
        </div>
      </div>

      {/* Área de texto clara con borde y foco agradable */}
      <div className="fb-create-textarea-container">
        <textarea
          ref={textareaRef}
          className="fb-create-textarea"
          placeholder="¿Qué estás pensando? Escribe aquí tu publicación..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (errorMessage) setErrorMessage('');
          }}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
        />
      </div>

      {/* Mensaje de validación si el usuario intenta publicar vacío */}
      {errorMessage && (
        <div style={{
          backgroundColor: '#fff3cd',
          color: '#856404',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '13px',
          marginBottom: '12px',
          border: '1px solid #ffeeba'
        }}>
          {errorMessage}
        </div>
      )}

      {/* Vista previa del medio adjunto antes de publicar */}
      {mediaPreview && (
        <div className="fb-preview-container">
          <div className="fb-preview-header">
            <span>
              {mediaType === 'video' ? '🎥 Vídeo adjunto preparado:' : '🖼️ Fotografía adjunta preparada:'}
            </span>
            <button
              type="button"
              className="fb-remove-btn"
              onClick={handleRemoveMedia}
              title="Quitar archivo adjunto"
            >
              <i className="fa fa-times"></i>
            </button>
          </div>

          {mediaType === 'video' ? (
            <video
              src={mediaPreview}
              controls
              className="fb-preview-video"
            />
          ) : (
            <img
              src={mediaPreview}
              alt="Vista previa"
              className="fb-preview-image"
            />
          )}
        </div>
      )}

      {/* Menú de muestras o enlace manual */}
      {showSamples && (
        <div style={{ background: '#f0f2f5', padding: '14px', borderRadius: '8px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <strong style={{ fontSize: '13px', color: '#050505' }}>Galería de contenido de muestra:</strong>
            <button
              type="button"
              className="fb-remove-btn"
              onClick={() => setShowSamples(false)}
            >
              <i className="fa fa-times"></i>
            </button>
          </div>

          <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#65676b' }}>Selecciona una fotografía:</p>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '10px' }}>
            {photoGallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Muestra ${i + 1}`}
                onClick={() => handleSelectSamplePhoto(img)}
                style={{
                  width: '64px',
                  height: '64px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border: mediaPreview === img ? '3px solid #1877f2' : '1px solid #ccc'
                }}
              />
            ))}
          </div>

          <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#65676b' }}>O selecciona un vídeo en MP4:</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {sampleVideos.map((v) => (
              <button
                key={v.id}
                type="button"
                className="w3-button w3-small w3-white w3-border w3-round"
                onClick={() => handleSelectSampleVideo(v.url)}
                style={{
                  fontWeight: mediaPreview === v.url ? 'bold' : 'normal',
                  borderColor: mediaPreview === v.url ? '#1877f2' : '#ccc'
                }}
              >
                🎥 {v.title}
              </button>
            ))}
          </div>

          <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#65676b' }}>O pega una URL web directa:</p>
          <div style={{ display: 'flex', gap: '6px' }}>
            <input
              type="text"
              className="w3-input w3-border w3-round"
              placeholder="https://ejemplo.com/imagen.jpg o video.mp4"
              id="manual-url-input"
              style={{ fontSize: '13px', background: '#fff' }}
            />
            <button
              type="button"
              className="w3-button w3-small w3-theme w3-round"
              onClick={() => {
                const el = document.getElementById('manual-url-input');
                if (el && el.value.trim()) {
                  const val = el.value.trim();
                  const isVid = val.endsWith('.mp4') || val.includes('video');
                  handleManualUrl(val, isVid ? 'video' : 'photo');
                  el.value = '';
                }
              }}
            >
              Adjuntar
            </button>
          </div>
        </div>
      )}

      {/* Input oculto para subir archivos reales desde el PC */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*,video/*"
        style={{ display: 'none' }}
      />

      {/* Barra de acciones: Adjuntar foto, video, galería y botón publicar */}
      <div className="fb-create-actions">
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {/* Botón para subir archivo desde la computadora */}
          <button
            type="button"
            className="fb-attach-btn"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
            title="Subir una foto o vídeo desde tu ordenador"
          >
            <i className="fa fa-folder-open fb-attach-photo"></i>
            <span>Subir de mi PC</span>
          </button>

          {/* Botón para abrir muestras */}
          <button
            type="button"
            className="fb-attach-btn"
            onClick={() => setShowSamples(prev => !prev)}
            title="Elegir fotos y vídeos de muestra"
          >
            <i className="fa fa-photo fb-attach-video"></i>
            <span>Fotos / Vídeos</span>
          </button>
        </div>

        {/* Botón Publicar siempre accesible y funcional */}
        <button
          type="button"
          className="fb-publish-btn"
          onClick={handleSubmit}
          title="Publicar en el feed (Ctrl + Enter)"
        >
          <i className="fa fa-paper-plane"></i> Publicar
        </button>
      </div>
    </div>
  );
}
