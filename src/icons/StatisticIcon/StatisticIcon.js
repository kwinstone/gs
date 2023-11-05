const StatisticIcon = ({size, color}) => {
    return (
        <div className="icon-gs" style={{height: size, width: size}}>
            <svg width={size} height={size} viewBox="0 0 169 170" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.3481 141.914H149.509" stroke={color} strokeWidth="10.5536" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M74.0868 77.7503V121.161H33.7014V77.7503C33.7014 73.8807 36.8675 70.7146 40.7371 70.7146H67.0511C70.9911 70.7146 74.0868 73.8807 74.0868 77.7503Z" stroke={color} strokeWidth="10.5536" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M134.663 34.549V121.229H94.2778V34.549C94.2778 30.6794 97.4439 27.5133 101.314 27.5133H127.627C131.497 27.5133 134.663 30.609 134.663 34.549Z" stroke={color} strokeWidth="10.5536" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

        </div>
    )
}

export default StatisticIcon;