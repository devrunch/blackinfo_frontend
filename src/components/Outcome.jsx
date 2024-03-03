const Outcome = () => {

    const features = [
        {
            title: "SHARP CURVES",
            description:
                "Inadequate warning signs and improper design can lead to accidents when drivers fail to navigate sharp curves safely.",
        },
        {
            title: "NARROW ROADS",
            description:
                "Limited space increases the risk of collisions, especially when vehicles attempt tro pass each other.",
        },
        {
            title: "POOR INTERSECTION DESIGN",
            description:
                "Complex intersections without proper signaling or lane markings can result in confusion and accidents.",
        },
        {
            title: "INADEQUATE LIGHTING",
            description:
                "Insufficient illumination during nighttime or adverse weather conditions reduces visibility and reaction time.",
        },
        {
            title: "UNEVEN SURFACE",
            description:
                ": Potholes, road irregularities and poor maintenance contribute to loss of control and accidents.",
        },
        {
            title: "INADEQUATE RAMPS AND ENTERANCE",
            description:
                "Poorly designed on-ramp and off-ramps",
        },
    ];
    return (
        <>
            <div className="bg-gray-200 p-10 ">

                <div className="mt-16 md:mt-0">
                    <h2 className=" text-gray-900 text-4xl lg:text-5xl font-bold lg:tracking-tight">
                        Analysis Outcome
                    </h2>
                    <p className="text-lg mt-4 text-slate-900">
                        What are the problems and the causes that these accident occur.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-16">
                    {
                        features.map((item) => (
                            <div className="flex gap-4 items-start bg-gray-700 p-4 rounded-lg" key={item.title}>
                                <div className="mt-1 bg-black rounded-full flex justify-center align-middle p-1 w-6 h-6 shrink-0">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 4C8.567 4 7 5.567 7 7.5C7 9.433 8.567 11 10.5 11C12.433 11 14 9.433 14 7.5C14 5.567 12.433 4 10.5 4ZM7.67133 11C6.65183 10.175 6 8.91363 6 7.5C6 6.08637 6.65183 4.82498 7.67133 4H4.5C2.567 4 1 5.567 1 7.5C1 9.433 2.567 11 4.5 11H7.67133ZM0 7.5C0 5.01472 2.01472 3 4.5 3H10.5C12.9853 3 15 5.01472 15 7.5C15 9.98528 12.9853 12 10.5 12H4.5C2.01472 12 0 9.98528 0 7.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{item.title}</h3>{" "}
                                    <p className="text-slate-200 mt-2 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Outcome