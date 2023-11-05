const StatIcon = ({size, color}) => {

    return (
        <div className="icon-gs" style={{width: size, height: size}}>
            <svg width={size} height={size} viewBox="0 0 169 170" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M128.402 19.7769H40.4553C28.7981 19.7769 19.3481 29.2268 19.3481 40.884V128.83C19.3481 140.488 28.7981 149.938 40.4553 149.938H128.402C140.059 149.938 149.509 140.488 149.509 128.83V40.884C149.509 29.2268 140.059 19.7769 128.402 19.7769Z" stroke={color} strokeWidth="10.5536" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M47.6318 84.8571H58.9593L72.2568 105.964L96.6004 63.75L109.898 84.8571H121.225" stroke={color} strokeWidth="10.5536" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

        </div>
    )
}

export default StatIcon;