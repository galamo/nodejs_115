import { mount } from "store/StoreApp";
import React, { useRef, useEffect } from "react";
import Store from "store/StoreApp";

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
