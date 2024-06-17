import React from "react";

const Container = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <div className="max-w-screen-2xl mx-auto">{children}</div>;
};

export default Container;
