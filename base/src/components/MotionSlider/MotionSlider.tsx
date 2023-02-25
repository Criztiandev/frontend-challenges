import { useEffect, useRef, useState } from "react";
import "./style.css";

const MotionSlider = () => {
  const [trackPosition, setTrackPosition] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current as HTMLDivElement | null;
    if (!track) return;

    const handleMouseDown = (e: MouseEvent) => {
      setTrackPosition(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (trackPosition === 0) return;
      const mouseDelta = e.clientX - trackPosition;
      const maxDelta = window.innerWidth / 2;

      // calculate the percentage of the track that has been moved
      const percentage = (mouseDelta / maxDelta) * 100;

      //! Problem: the track is getting reset after 2nd time drag
      //* Solution: create a variable that will store the new position of the track and clamp it between 0 to -100

      track.style.transform = `translate(${percentage}%, -50%)`;
    };

    track.addEventListener("mouseup", (e: MouseEvent) => {
      setTrackPosition(0);
    });

    track.addEventListener("mousedown", handleMouseDown);
    track.addEventListener("mousemove", handleMouseMove);

    return () => {
      track.removeEventListener("mousedown", handleMouseDown);
      track.removeEventListener("mousemove", handleMouseMove);
    };
  }, [trackPosition]);

  return (
    <div className="track" ref={trackRef}>
      <img
        className="image"
        src="https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        draggable="false"
      />
      <img
        className="image"
        src="https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
        draggable="false"
      />
      <img
        className="image"
        src="https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        draggable="false"
      />
      <img
        className="image"
        src="https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        draggable="false"
      />
      <img
        className="image"
        src="https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        draggable="false"
      />
      <img
        className="image"
        src="https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80"
        draggable="false"
      />
      <img
        className="image"
        src="https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80"
        draggable="false"
      />
      <img
        className="image"
        src="https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        draggable="false"
      />
    </div>
  );
};

export default MotionSlider;
