"use client";

import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import {Separator} from "@/components/ui/separator";

const Footer = () => {

    return (
        <footer className="flex-grow-0">
            <Separator className="w-full "></Separator>
            <MaxWidthWrapper>
                <div className="">
                    <div className="pb-2 pt-4">
                        <div className="flex justify-center">
                            <Image
                                priority
                                alt="Yatra Abstract Logo"
                                src={"/yatra.svg"}
                                width={144}
                                height={144}
                                className="h-36 w-36"
                                placeholder="blur"
                                blurDataURL="/yatra.svg"
                            />
                        </div>
                    </div>
                </div>
                <div className="py-10 md:flex md:items-center md:justify-between">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} All Rights Reserved
                        </p>
                    </div>

                    <div className="mt-4 flex items-center justify-center md:mt-0">
                        <div className="flex space-x-8">
                            <Link
                                href="#"
                                className="text-sm text-muted-foreground hover:text-gray-600"
                            >
                                Terms
                            </Link>
                            <Link
                                href="#"
                                className="text-sm text-muted-foreground hover:text-gray-600"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="#"
                                className="text-sm text-muted-foreground hover:text-gray-600"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>
    );
};

export default Footer;