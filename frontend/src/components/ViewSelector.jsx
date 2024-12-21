const ViewSelector = ({ sections }) => {

    return (
        <div className="px-5 flex flex-row">
            {sections.map((section) => (
                <div key={section.id}>
                    <button id={`b-${section.id}`} 
                        onClick={section.handleButtonClick}
                        className="mr-3"
                    >
                        {section.text}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default ViewSelector