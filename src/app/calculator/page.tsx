import { CalculatorData, } from "@/types/types";
import { API_ENDPOINTS, } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";

async function fetchCalculators(): Promise<CalculatorData[]> {
    const res = await fetch(API_ENDPOINTS.getListCalculator, {
        cache: 'no-store',
    });
    const data = await res.json();
    return data.payload;
}

const page = async () => {
    const calculatorList = await fetchCalculators();
    return (
        <>
            <div className="my-2.5 flex flex-col gap-2.5 mb-0 md:px-[156px] md:py-[72px] md:gap-3">
                <div className="px-2.5">
                    <h1 className="text-2xl leading-base text-common">Relationship Calculators - Understand your relationships better</h1>
                    <p className="text-common leading-5 font-para text-sm m-0">Human beings are social creatures. They have learnt and evolved with the help of each other. And they are seen to be their best selves when in the company of like-minded and supportive people. Since olden times, human beings have lived a life that would be impossible without the help of others. With time, the social setup becomes more distinct and well-defined. And somewhat inflexible.</p>
                </div>
                <div className="bg-[#E7F4FF] p-[20px] flex flex-col gap-[20px] flex-wrap md:flex-row justify-center items-center">
                    {calculatorList.map((item) =>
                    (<div className="px-2 py-2 bg-[#FFFFFF] rounded-[20px] flex gap-2.5 items-center md:w-[30%] w-full" key={item.id}>
                        <Image src="https://cdni.trulymadly.com/tm-static-assets-production/images/admin/Frame%20180.png" height={100} width={100} alt="/" />
                        <div className="flex flex-col">
                            <h5 className="font-medium text-base leading-5">{item.title}</h5>
                            <p className="font-[450] text-xs leading-4">{item.subtitle}</p>
                            <Link key={item.id} className="text-[#0E8EFF] leading-[15px] text-xs font-bold no-underline" href={`/calculator/${item.name}`}>Check Now &gt;&gt;</Link>
                        </div>
                    </div>)
                    )}
                </div>
                <div className="px-2.5">
                    <h1 className="text-2xl leading-base text-common">Meaning of Relationship</h1>
                    <p>Relationships became categorised, and each has a set of behavioural signals attached to it. Generally, that's a helpful thing to deal with awkward social interactions. But sometimes, it may lead to confusion in an individual's mind, especially when mixed feelings are involved. In such cases, one needs some external point of view to sort out their thoughts and emotions. That is when astrology may be of help! We have for you some of the best relationship calculators that will help you understand your relationships better!</p>
                    <p>In the ideal sense, a relationship is a bond between two people based on mutual affection, respect, care and solidarity. The core idea of a relationship is attachment. However, a relationship can have many aspects to it. Any relationship is a complex interaction between two people, where their mental, psychological and emotional traits play a significant role in determining how the relationship will be. Apart from the core emotions, some other feelings also change from relationship to relationship, depending on their nature. Some of them are protectiveness, attraction, selflessness and so on.</p>
                    <p>In the ideal sense, a relationship is a bond between two people based on mutual affection, respect, care and solidarity. The core idea of a relationship is attachment. However, a relationship can have many aspects to it. Any relationship is a complex interaction between two people, where their mental, psychological and emotional traits play a significant role in determining how the relationship will be. Apart from the core emotions, some other feelings also change from relationship to relationship, depending on their nature. Some of them are protectiveness, attraction, selflessness and so on.</p>
                    <p>But in the present scenario, where interaction is part and parcel of life, and social skills can make or break your lifestyle, relationships have taken more of a practical approach. The idea of colleagues, associates and such took popularity with more and more people working at the same place, but with no need to communicate with each other. Instead, these relations are built on shared experiences regarding the same place, person or event. Sometimes, things develop beyond work, and people find others who share interests with them beyond their shared workload. But many times, that is different. As a result, many relationships, especially of this nature, are often quite impersonal.</p>
                </div>
            </div>
            <div className='bg-[#F5A623] w-full h-auto md:py-[78px] md:px-[156px]'>
                <div className='flex-wrap md:flex-row flex gap-6 justify-center items-center px-[20px] py-[30px]'>
                    {calculatorList.map((calculator) => (
                        <Link key={calculator.id} href={`/calculator/${calculator.name}`} className='no-underline'>
                            <div className='flex justify-between w-[264px] bg-[#FFFFFF] rounded-xl p-[15px] items-center text-common'>
                                <span className='leading-5 text-[15px]'>{calculator.title}</span>
                                <span>&gt;</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default page