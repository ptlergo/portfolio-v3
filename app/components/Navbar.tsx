import { navLinks } from '../../constants';

const Navbar = () => {
    
    return (
        <nav>
            <div>
                <ul>
                    {navLinks.map((link) => <li key={link.id}> <a href={`${link.id}`}> {link.title} </a>  </li>)}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;