import ConnectButton from './ConnectButton';

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center p-3 bg-primary fixed">
        <p className="text-lg font-semibold text-white">Logo</p>
        <ConnectButton />
    </nav>
  );
};

export default Navbar;
