import Link from "next/link";
import SigninButon from "./SigninButton";

const Navbar = () => {
  return (
    <>
      <div className="navbar border ">
        <div className="container">
          <div className="flex-1">
            <Link href='/' className="btn btn-ghost normal-case text-xl">NoteFlow</Link>
          </div>
          <SigninButon/>
        </div>
      </div>
    </>
  );
};

export default Navbar;
