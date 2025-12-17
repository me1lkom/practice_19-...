// import "../style/Modal.css";
// import {
//   Card,
//     Typography,
// } from "@mui/material";

// function Modal({ isOpen, onClose, title, children }) {
//   // Если модалка закрыта - не показываем ничего
//   if (!isOpen) {
//     return null;
//   }
//   const handleBackgroundClick = (event) => {
//     if (event.target === event.currentTarget) {
//       onClose();
//     }
//   };
//   return (
//     <div className="modal-background" onClick={handleBackgroundClick}>
//       <Card className="modal-window">
//         <div className="modal-header">
//           <Typography variant="h2" component="h2" gutterBottom>{title}</Typography>
//           <button className="close-button" onClick={onClose}>
//             ×
//           </button>
//         </div>
//         <div className="modal-content">{children}</div>
//       </Card>
//     </div>
//   );
// }
// export default Modal;


import "../style/Modal.css";
import { Card, Typography } from "@mui/material";
import { useEffect } from "react"; // Добавьте импорт useEffect

function Modal({ isOpen, onClose, title, children }) {
  // Управляем классом на body
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      // Сохраняем позицию скролла
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
    } else {
      document.body.classList.remove("modal-open");
      // Восстанавливаем позицию скролла
      const scrollY = parseInt(document.body.style.top || '0');
      document.body.style.removeProperty('top');
      window.scrollTo(0, Math.abs(scrollY));
    }
    
    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.removeProperty('top');
    };
  }, [isOpen]);

  // Если модалка закрыта - не показываем ничего
  if (!isOpen) {
    return null;
  }

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

return (
  <div className="modal-background" onClick={handleBackgroundClick}>
    <Card className="modal-window" sx={{ display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
      <div className="modal-header">
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="modal-content">
        {children}
      </div>
    </Card>
  </div>
);
}

export default Modal;