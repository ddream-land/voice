const APIIcon = ({ className }: { className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width="20" height="20" viewBox="0 0 20 20"
      fill="none"
    >
      <g id="api">
        <path id="Vector" d="M15.5979 4.40208C17.0624 5.86654 17.0624 8.24091 15.5979 9.70538L14.1248 11.1785L8.82148 5.87522L10.2946 4.40208C11.7591 2.93761 14.1335 2.93761 15.5979 4.40208ZM15.5979 4.40208L17.5 2.5M4.40206 15.5979C5.86652 17.0624 8.24089 17.0624 9.70536 15.5979L11.1785 14.1248L5.8752 8.82149L4.40206 10.2946C2.93759 11.7591 2.93759 14.1335 4.40206 15.5979ZM4.40206 15.5979L2.5 17.5M7.05371 10L8.52685 8.52687M9.99999 12.9463L11.4731 11.4731" stroke="#7C878E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    </svg>
  );
};

export default APIIcon;