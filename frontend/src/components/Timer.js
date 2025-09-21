import { useEffect, useState } from "react";

function Timer({ duration, onFinish }) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time <= 0) {
      onFinish();
      return;
    }
    const interval = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [time, onFinish]);

  return <h5>⏳ Tiempo restante: {time}s</h5>;
}

export default Timer;
