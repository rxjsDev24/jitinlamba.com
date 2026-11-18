import type { CSSProperties } from "react";

type Motion = "rise" | "assemble";

function scatter(i: number): CSSProperties {
  return {
    "--i": i,
    "--dx": `${(((i * 37) % 11) - 5) * 0.5}em`,
    "--dy": `${(((i * 53) % 9) - 4) * 0.4}em`,
    "--r": `${(((i * 29) % 13) - 6) * 6}deg`,
  } as CSSProperties;
}

export function SplitLetters({
  text,
  motion,
}: {
  text: string;
  motion: Motion;
}) {
  let index = 0;
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden className={`split split-${motion}`}>
        {text.split(" ").map((word, w) => (
          <span key={w} className="split-word">
            {[...word].map((letter) => {
              const i = index++;
              return (
                <span key={i} className="split-letter" style={scatter(i)}>
                  {letter}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </>
  );
}
