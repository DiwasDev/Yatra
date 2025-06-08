"use client";

import Link from "next/link";
import { TbDiscount } from "react-icons/tb";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import Image from "next/image";
import GetStarted from "@/components/landing/GetStartedButton";
import {BackgroundCircles, Gradient} from "@/design/Hero";
import {BiHomeSmile} from "react-icons/bi";
import {MapIcon, Search} from "lucide-react";
import {FaUserFriends} from "react-icons/fa";
import Notification from "@/components/landing/Notification";

const heroIcons = [BiHomeSmile, Search, MapIcon, FaUserFriends]
const Hero = () => {
    const parallaxRef = useRef(null);
    return (
        <>
            <section
                id="home"
                className={`flex lg:flex-row flex-col mt-8 sm:mt-0 sm:py-16 py-6`}
            >
                <div
                    className={`flex-1 flex justify-center items-start flex-col xl:px-0 sm:px-16 px-6`}
                    ref={parallaxRef}
                >
                    <div className="flex flex-row items-center py-[3px] px-[2px] sm:py-[6px] sm:px-4 bg-gradient-to-r from-[#60d3ea] via-blue-200 to-blue-400 rounded-[10px] mb-2">
                        <TbDiscount className="w-8 h-8" />
                        <p
                            className={`font-poppins font-normal text-[14px] sm:text-[18px] leading-[30.8px] ml-2`}
                        >
              <span className="text-black dark:text-white">
                All-in-one app for
                  <span className="text-slate-700 dark:text-slate-300"> endless memories</span>{" "}
                  & convenience
              </span>
                        </p>
                    </div>

                    <div className="flex flex-row justify-between items-center w-full">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                            Create <span className="bg-gradient-to-r from-[#60d3ea] via-blue-400 to-blue-600 bg-clip-text text-transparent">Endless Memories</span>
                        </h1>
                        <div className="sm:flex hidden md:mr-4 mr-0">
                            <Link href={"/auth/login"}>
                                <GetStarted />
                            </Link>
                        </div>
                    </div>
                    <p
                        className={`font-normal text-slate-700 dark:text-slate-300  text-[18px] leading-[30.8px] max-w-[470px] mt-5`}
                    >
                        Experience travel, planning, and fun—all in one place. Yatra makes your journey seamless, memorable, and convenient.
                    </p>
                </div>

                <div
                    className={`flex-1 flex justify-center items-center md:my-0 my-10 relative`}
                >
                    <Image
                        priority
                        // fill={true}
                        src="/yatra.svg"
                        alt="Hero image"
                        width={512}
                        height={1024}
                        // loading="lazy"
                        placeholder="blur"
                        blurDataURL={"/yatra.svg"}
                        className="w-[100%] h-[100%] relative z-[5]"
                    />

                    {/* gradient start */}
                    {/* <div className="absolute z-[0] w-[20%] h-[35%] top-0 pink__gradient" />*/}
                    {/*<div className="absolute z-[1] w-[20%] h-[80%] rounded-full white__gradient bottom-40" />*/}
                    {/*<div className="absolute z-[0] w-[20%] h-[50%] right-20 bottom-20 blue__gradient" /> */}
                    {/* gradient end */}
                </div>

                <div className={`sm:hidden flex justify-center items-center`}>
                    <GetStarted />
                </div>
                <BackgroundCircles parallaxRef={""} />
            </section>

            <div className="relative max-w-[23rem] mt-24 md:mt-0 mx-auto md:max-w-5xl xl:mb-24">
                <div className="relative z-1 p-0.5 rounded-2xl bg-gradient-to-r from-[#60d3ea] via-blue-200 to-blue-400">
                    <div className="relative rounded-[1rem]">
                        <div className="h-[1.4rem] rounded-t-[0.9rem]" />

                        <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                            <Image
                                priority
                                src={"/yatra.svg"}
                                className="w-full"
                                width={1024}
                                height={490}
                                alt="AI Image"
                                placeholder="blur"
                                // loading="lazy"
                                blurDataURL={"/yatra.svg"}
                            />

                            <ScrollParallax isAbsolutelyPositioned>
                                <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 backdrop-blur border rounded-2xl xl:flex">
                                    {heroIcons.map((Icon, index) => (
                                        <li className="p-5" key={index}>
                                            <Icon
                                                className={"w-6 h-6"}
                                            />
                                            {/* <Image priority src={icon} width={24} height={25} alt={icon} /> */}
                                        </li>
                                    ))}
                                </ul>
                            </ScrollParallax>

                            <ScrollParallax isAbsolutelyPositioned>
                                <Notification
                                    className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                                    title="Marriage ceremony!"
                                />
                            </ScrollParallax>
                        </div>
                    </div>

                    <Gradient />
                </div>
            </div>
        </>
    );
};

export default Hero;