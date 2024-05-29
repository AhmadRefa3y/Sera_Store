"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import { Button } from "./ui/button";

interface imageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<imageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value,
}) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map.length >= 1 &&
                    value.map(
                        (url) =>
                            url.length >= 1 && (
                                <div
                                    key={url}
                                    className="relative w-[200px] h-[200px] rounded-md overflow-hidden]"
                                >
                                    <div className="z-10 absolute top-2 right-2">
                                        <Button
                                            type="submit"
                                            onClick={() => onRemove(url)}
                                            variant={"destructive"}
                                            size={"icon"}
                                        >
                                            <Trash />
                                        </Button>
                                    </div>
                                    <Image
                                        fill
                                        className="object-cover"
                                        alt="iamge"
                                        src={url}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            )
                    )}
            </div>
            <CldUploadWidget onSuccess={onUpload} uploadPreset="mn2jf7zs">
                {({ open }) => {
                    const onclick = () => {
                        open();
                    };
                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant={"secondary"}
                            onClick={onclick}
                        >
                            Upload Images <ImagePlus className="h-4 w-4 ml-2" />
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};
export default ImageUpload;
