import { Navbar } from './Navbar';

type HeaderProps = {
  isLightTheme: boolean;
  onToggleTheme: () => void;
};

export function Header({ isLightTheme, onToggleTheme }: HeaderProps) {
  return (
    <header className="site-header">
      <Navbar isLightTheme={isLightTheme} onToggleTheme={onToggleTheme} />
    </header>
  );
}
