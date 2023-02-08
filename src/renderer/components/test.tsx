import React from "react";

export const HelloWorld = () => {
  React.useEffect(() => {
    console.log("rendered");
  });
  return <div>test</div>;
};
