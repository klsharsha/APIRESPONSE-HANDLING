import React, { useState, useEffect } from 'react';
import './UndoDelete.css';

const UndoDelete = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]);

  const [deletedItem, setDeletedItem] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle the countdown timer
  useEffect(() => {
    let timer;
    
    if (deletedItem && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            // Time's up - permanently delete
            permanentlyDelete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [deletedItem, countdown]);

  const handleDelete = (item) => {
    setItems(items.filter(i => i.id !== item.id));
    setDeletedItem(item);
    setCountdown(5);
    setIsDeleting(false);
  };

  const handleUndo = () => {
    if (deletedItem) {
      setItems([...items, deletedItem].sort((a, b) => a.id - b.id));
      setDeletedItem(null);
      setCountdown(5);
    }
  };

  const permanentlyDelete = () => {
    setDeletedItem(null);
    setCountdown(5);
  };

  return (
    <div className="container">
      <h2>Task A: Undo Delete</h2>
      
      <div className="items">
        {items.map(item => (
          <div key={item.id} className="item">
            <span>{item.name}</span>
            <button onClick={() => handleDelete(item)}>Delete</button>
          </div>
        ))}
      </div>

      {deletedItem && (
        <div className="toast">
          <p>"{deletedItem.name}" deleted - Undo in {countdown}s</p>
          <button onClick={handleUndo}>UNDO</button>
        </div>
      )}
    </div>
  );
};

export default UndoDelete;
