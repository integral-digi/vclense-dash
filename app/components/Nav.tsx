import Image from "next/image";

const Nav = () => {
	return (
		<nav className="hidden lg:block w-full">
            {/* Logo */}
            <Image 
                src="/assets/logo.svg" 
                alt="VClense Logo" 
                width={160} 
                height={36} 
            />
		</nav>
	);
}

export default Nav;