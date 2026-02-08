import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatContainer from './components/ChatContainer';
import { initSocket } from './socket';
import ParticleBackground from './components/ParticleBackground';
import './styles/App.css';

function App() {
  useEffect(() => {
    // Initialize socket connection
    const socket = initSocket();
    
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="app">
      {/* Animated Backgrounds */}
      <div className="matrix-bg" />
      <ParticleBackground />
      
      {/* Header */}
      <motion.header 
        className="app-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="logo-container">
          <div className="holographic-logo">
            <i className="fas fa-comments"></i>
          </div>
          <div>
            <h1 className="logo-text">NEON<span style={{ color: 'var(--neon-pink)' }}>CHAT</span></h1>
            <span className="subtitle">Real-time Communication Platform</span>
          </div>
        </div>

        <motion.div 
          className="status-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="status-dot" />
          <span className="status-text">SYSTEM ONLINE</span>
          <span className="status-text">•</span>
          <span className="status-text">LATENCY: 12ms</span>
        </motion.div>
      </motion.header>

      {/* Main Content */}
      <main className="app-main">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ChatContainer />
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        className="app-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="footer-content">
          <p className="footer-text">
            ⚡ Powered by React & Socket.io • Real-time AI Enhanced Chat
          </p>
          <div className="footer-links">
            <a href="#" className="footer-link">Docs</a>
            <a href="#" className="footer-link">GitHub</a>
            <a href="#" className="footer-link">Support</a>
            <a href="#" className="footer-link">API</a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;