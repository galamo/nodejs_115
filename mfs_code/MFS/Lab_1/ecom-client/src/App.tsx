import { Helloworld } from "react-vite-library";
import { Products } from "mfs-products-build-time-v1";
import "./App.css";

function App() {
  const isUsingFilter = false
  return (
    <>
      <div>
        <h1>Host Client </h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "cetner",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            height: "80vh",
            width: "50vw",
            overflow: "auto",
          }}
        >
          <Helloworld text="test" />
        </div>
        <div
          style={{ border: "1px solid black", height: "80vh", width: "50vw" }}
        >
          {" "}
          <Products products={[]} isUsingFilter={isUsingFilter} />
        </div>
      </div>
    </>
  );
}
// inside Products
// if(isUsingFilter) ? 

export default App;
