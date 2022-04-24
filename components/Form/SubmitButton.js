import Spinner from "../UI/Spinner";

export default function SubmitButton({ loading, text, onClick, type, width }) {
    return (
        <button
            onClick={onClick}
            type={type || "button"}
            disabled={loading}
            className={`mx-auto bg-gradient-to-r from-pink-600 to-purple-600 px-7 py-3 flex items-center justify-center rounded-md outline-none cursor-pointer font-semibold w-full`}
        >
            {loading && (
                <Spinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            )}
            {text}
        </button>
    );
}
