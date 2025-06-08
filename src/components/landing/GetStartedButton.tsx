import { MdArrowOutward } from "react-icons/md";

const GetStarted = () => (
    <div
        className={`flex justify-center items-center w-[140px] h-[140px] rounded-full group bg-gradient-to-r from-[#60d3ea] via-blue-400 to-blue-600 hover:bg-transparent p-[2px] cursor-pointer`}
    >
        <div
            className={`flex justify-center items-center flex-col bg-white dark:bg-black w-[100%] h-[100%] rounded-full`}
        >
            <div className={`flex justify-center items-start flex-row`}>
                <p className="font-medium text-[18px] leading-[23.4px]">
                    <span className="bg-gradient-to-r from-[#60d3ea] via-blue-400 to-blue-600 bg-clip-text text-transparent font-bold">Create</span>
                </p>
                <MdArrowOutward className="w-[23px] h-[23px]" />
            </div>

            <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
                <span className="bg-gradient-to-r from-[#60d3ea] via-blue-400 to-blue-600 bg-clip-text text-transparent font-bold">Memories!</span>
            </p>
        </div>
    </div>
);

export default GetStarted;
