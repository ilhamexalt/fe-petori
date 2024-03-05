import MenuComponet from "./Menu";

export function NavbarComponent() {
  return (
    <nav
      className={`flex items-center justify-between max-h-2/6  mx-auto px-5 py-3 md:px-9 md:py-6 bg-white fixed -top-1 md:top-0 left-0 right-0 z-50 `}
    >
      <MenuComponet />
      {/* sticky top-0 z-50 */}
    </nav>
  );
}
