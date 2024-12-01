import ScaleLoader from "react-spinners/ScaleLoader";

interface ButtonProps {
    label: string;
    onClick: () => void;
    isLoading: boolean;
    disabled?: boolean; // Make it optional
}

const Button: React.FC<ButtonProps> = ({ label, onClick, isLoading, disabled = false }) => {
    const opacity = disabled ? 0.75 : 1;
    const cursor = disabled ? "not-allowed" : "pointer";

    const Contents = isLoading ? (
        <ScaleLoader
            color="#000"
            height={15} // Adjust height for loader
            width={5} // Adjust width for loader
            margin={2} // Adjust margin between loader items
            loading={true}
            style={{ display: "block", margin: "0 auto" }} // Use style prop instead of css
        />
    ) : (
        <p style={{ margin: 0, padding: 0 }}>{label}</p>
    );

    return (
        <button
            onClick={disabled ? undefined : onClick} // Prevent onClick when disabled
            style={{
                backgroundColor: '#fb923c',
                color: "white",
                border: "2px solid #ddd",
                borderRadius: "8px",
                padding: "8px 20px",
                fontSize: "16px",
                outline: "none",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                opacity,
                cursor,
            }}
            disabled={disabled} // Set the button's disabled attribute
        >
            {Contents}
        </button>
    );
};

export default Button;
