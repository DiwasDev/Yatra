const stats = [{
    id: 1,
    title: "Foreign Visitors",
    value: "3M+",
},
{
    id: 2,
    title: "Domestic Travellers",
    value: "30M+",

}, {
    id: 3,
    title: "Total Market",
    value: "$617M",

}];

const Stats = () => (
    <section
        className={`flex flex-col md:flex-row justify-center items-start md:items-center sm:mb-20 mb-6`}
    >
        {stats.map((stat: any) => (
            <div
                key={stat.id}
                className={`flex-1 flex justify-start items-center flex-row m-3`}
            >
                <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-black dark:text-white">
                    {stat.value}
                </h4>
                <p className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] bg-gradient-to-r from-[#60d3ea] via-blue-400 to-blue-600 bg-clip-text text-transparent uppercase ml-3">
                    {stat.title}
                </p>
            </div>
        ))}
    </section>
);

export default Stats;