import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export default function Home() {
  const auth = useContext(AuthContext);
  let name = "";
  if (auth && auth.currentUser) {
    const { displayName, email } = auth.currentUser;
    name = displayName || email;
  }

  return (
    <>
      <h3>{name}</h3>

      <div>
        <h1>Abouts us</h1>
        <p>
          This page is created to help families sell gently used children's toys
          and books. The users of this site can buy and sell their item. This
          will help our environment by reusing thing which may not be important
          for them and buying used one intstead of new ones. It would also be
          good to get items affordable as those item sold will be cheaper than a
          new ones.
        </p>
        <img src="/book1.jpg" />
        <label>Books</label>
        <p>
          {" "}
          For fammilies who want to donate for free can upload their items and
          put price free. So that the families who may need it can take it. This
          would be a win win instead of throwing away toys and books finding
          someone who may use it and whom those need toys and books in lower
          price or for free would be benefited.
        </p>
        <img src="/itspottytime.jpg" />
      </div>
    </>
  );
}
