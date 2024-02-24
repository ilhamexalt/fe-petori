import MenuComponet from "./Menu";

export function NavbarComponent() {
  return (
    <nav
      className={`flex items-center justify-between h-2/5 p-5 md:p-9 bg-white sticky top-0 z-50`}
    >
      <MenuComponet />
    </nav>
  );
}
