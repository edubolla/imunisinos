const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export default function LinkifiedText({ text }: { text: string }) {
  const parts = text.split(URL_REGEX);

  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 0) {
          return part;
        }

        const trailingPunctuation = part.match(/[.,;:!?)]+$/)?.[0] ?? "";
        const url = trailingPunctuation ? part.slice(0, -trailingPunctuation.length) : part;

        return (
          <span key={index}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              {url}
            </a>
            {trailingPunctuation}
          </span>
        );
      })}
    </>
  );
}
