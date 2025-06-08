import Image from "next/image";

// Dummy data for Yatra features
const features = [
    {
        id: 1,
        title: "Booking Insights",
        text: "See if your hotel booking may cancel. Get instant alternatives.",
        iconUrl: "/yatra.svg",
        backgroundUrl: "/yatra.svg",
        imageUrl: "/yatra.svg"
    },
    {
        id: 2,
        title: "Events Hosting",
        text: "Find or host local events and marriages easily.",
        iconUrl: "/yatra.svg",
        backgroundUrl: "/yatra.svg",
        imageUrl: "/yatra.svg"
    },
    {
        id: 3,
        title: "Travel Matchmaking",
        text: "Connect with travelers sharing your interests.",
        iconUrl: "/yatra.svg",
        backgroundUrl: "/yatra.svg",
        imageUrl: "/yatra.svg"
    },
];

const Features = () => {
	return (
		<div className={"py-10 lg:py-16 xl:py-20"}>
			<div className="relative z-[2] flex flex-col justify-center items-center">
				<h2 className="text-2xl leading-[2.5rem] md:text-3xl md:leading-[2.5rem] lg:text-4xl lg:leading-[3.5rem] xl:text-5xl xl:leading-tight">
					Travel Smarter with Yatra
				</h2>

				<div className="grid flex-wrap gap-10 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-10 mt-10">
					{features?.map((Item: any) => {
						return (
							<div
								className="block relative bg-no-repeat bg-[length:100%_100%] sm:max-w-[24rem] md:max-w-[20rem]"
								style={{
									backgroundImage: `url(${Item.backgroundUrl})`,
								}}
								key={Item.id}
							>
								<div className="relative z-[2] flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
									<h5 className="text-2xl leading-normal mb-5">
										{Item.title}
									</h5>
									<p className="font-light text-[0.875rem] leading-6 md:text-base mb-6 text-[#ADA8C3]">
										{Item.text}
									</p>
									<div className="flex items-center mt-auto">
										<Image
											priority
											src={Item.iconUrl || "/placeholder.svg"}
											// className="h-auto w-auto"
											width={48}
											height={48}
											alt={Item.title || "Item iconURL"}
											placeholder="blur"
											blurDataURL={Item.iconUrl || "/placeholder.svg"}
											// loading="lazy"
										/>
										<p className="ml-auto font-code text-xs font-bold uppercase tracking-wider">
											For 100% Free
										</p>
									</div>
								</div>

								<div className="absolute top-0 left-1/4 w-full aspect-square bg-radial-gradient from-[#28206C] to-[#28206C]/0 to-70% pointer-events-none" />

								<div
									className="absolute inset-0.5"
									style={{ clipPath: "url(#benefits)" }}
								>
									<div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
										{Item.imageUrl && (
											// <FaIdeal />
											// <Item.ImageUrl className="w-[380px] h-[362px]"></Item.ImageUrl>
											<Image
												priority
												src={
													Item.imageUrl ||
													"/benefits/image-2.png"
												}
												width={380}
												height={362}
												alt={Item.title}
												className="w-full h-full object-cover"
												placeholder="blur"
												blurDataURL={"/benefits/image-2.png"}
												// loading="lazy"
											/>
										)}
									</div>
								</div>

								<svg className="block" width={0} height={0}>
									<clipPath id="benefits" clipPathUnits="objectBoundingBox">
										<path d="M0.079,0 h0.756 a0.079,0.083,0,0,1,0.058,0.026 l0.086,0.096 A0.079,0.083,0,0,1,1,0.179 V0.917 c0,0.046,-0.035,0.083,-0.079,0.083 H0.079 c-0.044,0,-0.079,-0.037,-0.079,-0.083 V0.083 C0,0.037,0.035,0,0.079,0" />
									</clipPath>
                                </svg>
                            </div>
                        )
                        }
                        )}
                </div>
            </div>
        </div>

                    )

};

export default Features;