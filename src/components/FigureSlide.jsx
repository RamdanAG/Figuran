import React, { useState, useEffect, useCallback } from 'react';
import '../styles/FigureSlide.scss';

const FigureSlide = ({ figure, isActive, onNext, onPrev }) => {
  const [progress, setProgress] = useState(0);
  const duration = 3000; // 3 detik
  
  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      return;
    }
    
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / duration) * 100;
      
      if (newProgress >= 100) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => {
          onNext();
        }, 300);
      } else {
        setProgress(newProgress);
      }
    }, 16); // ~60fps
    
    return () => clearInterval(timer);
  }, [isActive, onNext, duration]);
  
  return (
    <div className={`figure-slide ${isActive ? 'active' : ''}`}>
      <div className="figure-slide__background">
        <img src={figure.image} alt={figure.title} />
        <div className="figure-slide__overlay"></div>
      </div>
      
      <div className="figure-slide__content">
        <div className="figure-slide__info">
          <div className="info-tag">Released products</div>
          <h1 className="info-title">{figure.title}</h1>
          <p className="info-subtitle">{figure.subtitle}</p>
          <button className="info-btn">EXPLORE</button>
        </div>
        
        <div className="figure-slide__details">
          <div className="detail-date">
            {figure.date}
            <div className="copyright">©2026</div>
          </div>
          <div className="detail-credits">
            <div className="credit-item">
              <span className="credit-label">Sculptor:</span>
              <span className="credit-name">{figure.sculptor}</span>
            </div>
            <div className="credit-item">
              <span className="credit-label">Painter:</span>
              <span className="credit-name">{figure.painter}</span>
            </div>
          </div>
        </div>
      </div>
      
      {isActive && (
        <div className="figure-slide__progress">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default FigureSlide;