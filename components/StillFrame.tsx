"use client";

import { useState } from "react";

type Box = { left: number; top: number; width: number; height: number };

type Props = {
  src: string;
  fileName: string;
  ratio?: "wide" | "portrait" | "photo";
  cameraId?: string;
  caption?: string;
  note?: string;
  box?: Box;
  label?: string;
};

export function StillFrame({ src, fileName, ratio = "wide", cameraId, caption, note, box, label }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  function bindImage(el: HTMLImageElement | null) {
    if (!el) return;
    if (el.complete && el.naturalWidth > 0) setLoaded(true);
  }

  return (
    <figure style={{ margin: 0 }}>
      <div className={`still ${ratio === "portrait" ? "portrait" : ""} ${ratio === "photo" ? "photo" : ""}`}>
        {!failed ? (
          <img
            src={src}
            alt=""
            ref={bindImage}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        ) : null}
        {!loaded || failed ? <div className="stillEmpty">{fileName}</div> : null}
        {loaded && !failed && box && label ? (
          <div
            className="detBox"
            style={{ left: `${box.left}%`, top: `${box.top}%`, width: `${box.width}%`, height: `${box.height}%` }}
          >
            <span className="detLabel">{label}</span>
          </div>
        ) : null}
      </div>
      {caption ? (
        <figcaption className="caption">
          <strong>{caption}</strong>
          {note ? <span>{note}</span> : null}
        </figcaption>
      ) : null}
      {cameraId ? <p className="camLine">{cameraId} · 抽出静止画</p> : null}
    </figure>
  );
}
