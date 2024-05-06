"use client";
import ImageUpload from "@/components/ImageUpload";
import React, { useState } from "react";

const page = () => {
    const [urlImg, seturl] = useState("");

    return (
        <div>
            <ImageUpload
                onChange={(value) => seturl(value)}
                onRemove={(value) => seturl("")}
                value={[urlImg]}
            />
        </div>
    );
};

export default page;
