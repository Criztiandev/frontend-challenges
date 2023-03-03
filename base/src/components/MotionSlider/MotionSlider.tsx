import { useEffect, useRef, useState, useCallback } from "react";
import "./style.css";

const imagesDataset = [
  {
    id: 0,
    src: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    alt: "img",
  },
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1531219572328-a0171b4448a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    alt: "img",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1525762867061-21c9fb70b15a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    alt: "img",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
    alt: "img",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    alt: "img",
  },
];

const MotionSlider = () => {
  // Set up state variables to keep track of dragging status, track position,
  // previous track position, and next percentage constrained.
  const [isDragging, setIsDragging] = useState(false);
  const [trackPosition, setTrackPosition] = useState<number>(0);
  const [previousTrackPosition, setPreviousTrackPosition] = useState<number>(0);
  const [nextPercentageConstrained, setNextPercentageConstrained] =
    useState<number>(0);

  // Use a ref to get a reference to the track element in the DOM.
  const trackRef = useRef<HTMLDivElement>(null);

  // Define callback functions to handle mouse events on the track.
  // useCallback is used to memoize the functions and prevent unnecessary re-renders.
  const handleMouseDown = useCallback((e: MouseEvent) => {
    const { clientX } = e;
    setTrackPosition(clientX);
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      setTrackPosition(0);
      setPreviousTrackPosition(nextPercentageConstrained);
      setIsDragging(false);
    },
    [nextPercentageConstrained]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) {
        return;
      }

      // if the track position has not moved, return to prevent the track from moving
      if (trackPosition === 0) {
        return;
      }

      // Get the width of the track and the distance the mouse has moved.
      const trackWidth = trackRef.current?.offsetWidth ?? 1;
      const mouseDelta = e.clientX - trackPosition;
      const maxDelta = trackWidth / 2;

      // Calculate the percentage of the track that has been moved.
      const percentage = (mouseDelta / maxDelta) * 100;

      // Add the percentage of movement to the previous track position and constrain it
      // to be between -100 and 0.
      const storePercentage = previousTrackPosition + percentage;
      const nextPercentage = Math.max(Math.min(storePercentage, 0), -100);

      // Use requestAnimationFrame to update the track position for smooth animation.
      requestAnimationFrame(() => {
        setNextPercentageConstrained(nextPercentage);
      });
    },
    [isDragging, previousTrackPosition, trackPosition]
  );

  // Set up event listeners on the track and window for mouse events.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    track.addEventListener("mousedown", handleMouseDown);
    track.addEventListener("mousemove", handleMouseMove);
    track.addEventListener("mouseup", handleMouseUp);

    const handleMouseLeave = () => {
      setIsDragging(false);
    };

    window.addEventListener("mouseup", handleMouseLeave);

    // Clean up event listeners when the component unmounts.
    return () => {
      track.removeEventListener("mousedown", handleMouseDown);
      track.removeEventListener("mousemove", handleMouseMove);
      track.removeEventListener("mouseup", handleMouseUp);

      window.removeEventListener("mouseup", handleMouseLeave);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  // Set the track style based on the next percentage constrained, which
  // updates when the user drags the track.
  const trackStyle = {
    transform: `translate(${nextPercentageConstrained}%, -50%)`,
    transition: "transform 3s ease-out",
  };

  return (
    <>
      <div ref={trackRef} className="track" style={trackStyle}>
        {imagesDataset.length > 0 &&
          imagesDataset.map((items) => (
            <img
              style={{
                objectPosition: `${nextPercentageConstrained + 100}% 50%`,
                // buttery smooth transition
                transition: "object-position 3s ease-out",
              }}
              src={items.src}
              alt={items.alt}
              key={items.id}
              className="image"
              draggable="false"
            />
          ))}
      </div>
    </>
  );
};

export default MotionSlider;
