export default function WidgetLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`html, body { height: 100%; margin: 0; overflow: hidden; }`}</style>
      <div className="h-full w-full">{children}</div>
    </>
  );
}
