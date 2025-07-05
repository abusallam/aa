import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <style jsx>{`
        .loading {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          z-index: 1000;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid var(--border-color);
          border-radius: 50%;
          border-top-color: var(--primary-color);
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-color-scheme: dark) {
          .loading {
            background: rgba(26, 26, 26, 0.9);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
