import React, { useRef } from 'react';

const ScrollableContainer = ({ items, renderItem, maxVisibleItems, isHorizontal }) => {
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMouseDown = (event) => {
    isDragging.current = true;
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.classList.remove('no-select');
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleDrag = (event) => {
    if (!isDragging.current) return;
    event.preventDefault();
    if (isHorizontal) {
      containerRef.current.scrollLeft -= event.movementX;
    } else {
      containerRef.current.scrollTop -= event.movementY;
    }
  };

  const handleTouchStart = (event) => {
    if (isHorizontal) {
      containerRef.current.dataset.scrollX = containerRef.current.scrollLeft;
      containerRef.current.dataset.clientX = event.touches[0].clientX;
    } else {
      containerRef.current.dataset.scrollY = containerRef.current.scrollTop;
      containerRef.current.dataset.clientY = event.touches[0].clientY;
    }
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    if (isHorizontal) {
      const scrollX = parseInt(containerRef.current.dataset.scrollX, 10);
      const clientX = containerRef.current.dataset.clientX;
      const newScrollLeft = scrollX - (event.touches[0].clientX - clientX);
      containerRef.current.scrollLeft = newScrollLeft;
    } else {
      const scrollY = parseInt(containerRef.current.dataset.scrollY, 10);
      const clientY = containerRef.current.dataset.clientY;
      const newScrollTop = scrollY - (event.touches[0].clientY - clientY);
      containerRef.current.scrollTop = newScrollTop;
    }
  };

  return (
    <div
      className={`flex ${isHorizontal ? 'overflow-x-auto' : 'overflow-y-auto'} space-x-2 p-2 w-full`}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{
        overflowY: isHorizontal ? 'hidden' : 'auto',
        maxHeight: isHorizontal ? 'auto' : `calc(600px * ${maxVisibleItems})`,
        maxWidth: isHorizontal ? `calc(120px * ${maxVisibleItems})` : '100%',
      }}
    >
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
};

export default ScrollableContainer;